'use client';

import React, { useEffect, useRef, useState } from 'react';
import Tool from './Tool';
import Element from './Element';
import { Spinner } from '@/components/ui/spinner';
import { FileCode2 } from 'lucide-react';


const HTML_code = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="AI Website Builder" />
                <title>Preview</title>

                <!-- Tailwind CSS -->
                <script src="https://cdn.tailwindcss.com"></script>

                <!-- Flowbite -->
                <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css"
                    rel="stylesheet"
                />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>

                <!-- Lucide -->
                <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>

                <!-- Chart.js -->
                <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

            </head>
            <body>
                <div id="root"></div>
            </body>
            </html>`

// Ensure every element in the HTML string has a stable data-edit-id.
// Run this ONCE whenever fresh generatedCode arrives (e.g. right after
// the AI response comes in, before it's ever pushed into the iframe).
export const assignEditIds = (html) => {
    if (!html) return html;
    const parser = new DOMParser();
    const cleanHtml = html
        ?.replace(/```html/g, '')
        ?.replace(/```/g, '')
        ?.trim() || '';

    const doc = parser.parseFromString(`<div id="root">${cleanHtml}</div>`, 'text/html');
    let counter = 0;

    doc.querySelectorAll('#root *').forEach((el) => {
        if (!el.getAttribute('data-edit-id')) {
            el.setAttribute('data-edit-id', `el-${Date.now()}-${counter++}`);
        }
    });

    return doc.getElementById('root').innerHTML;
};

function WebsiteDes({ generatedCode, setGeneratedCode, isLoading }) {
    const iframeRef = useRef(null);
    const [screenSize, setScreenSize] = useState(false);
    const [isIframeLoaded, setIsIframeLoaded] = useState(false);
    const [selectedElement, setSelectedElement] = useState(null);

    // Fallback: check if the iframe is already loaded on mount
    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe && iframe.contentDocument && (iframe.contentDocument.readyState === 'complete' || iframe.contentDocument.readyState === 'interactive')) {
            setIsIframeLoaded(true);
        }
    }, []);

    // Commit whatever the live DOM node currently looks like (style + class)
    // back into generatedCode, keyed by data-edit-id.
    const syncElementToCode = (editId) => {
        if (!editId) return;
        const iframe = iframeRef.current;
        const doc = iframe?.contentDocument || iframe?.contentWindow?.document;
        if (!doc) return;

        const liveEl = doc.querySelector(`[data-edit-id="${editId}"]`);
        if (!liveEl) return;

        setGeneratedCode((prevCode) => {
            const parser = new DOMParser();
            const parsedDoc = parser.parseFromString(
                `<div id="root">${prevCode}</div>`,
                "text/html"
            );

            const originalElement = parsedDoc.querySelector(`[data-edit-id="${editId}"]`);
            if (!originalElement) return prevCode;

            // sync inline style
            const styleAttr = liveEl.getAttribute('style');
            if (styleAttr) {
                originalElement.setAttribute('style', styleAttr);
            } else {
                originalElement.removeAttribute('style');
            }

            // sync classes
            originalElement.className = liveEl.className;

            return parsedDoc.getElementById("root").innerHTML;
        });
    };

    useEffect(() => {
        if (!isIframeLoaded) return;

        const iframe = iframeRef.current;
        if (!iframe) return;

        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!doc) return;

        let hoverEl = null;
        let selectedEl = null;

        const handleMouseOver = (e) => {
            if (selectedEl) return;

            hoverEl = e.target;
            hoverEl.style.outline = "2px dotted blue";
            hoverEl.style.cursor = "pointer";
        };

        const handleMouseOut = () => {
            if (selectedEl) return;

            if (hoverEl) {
                hoverEl.style.outline = "";
                hoverEl = null;
            }
        };

        const handleBlur = (e) => {
            const editedElement = e.target;
            const editId = editedElement.dataset.editId;

            if (!editId) return;

            setGeneratedCode((prevCode) => {
                const parser = new DOMParser();

                const doc = parser.parseFromString(
                    `<div id="root">${prevCode}</div>`,
                    "text/html"
                );

                const originalElement = doc.querySelector(
                    `[data-edit-id="${editId}"]`
                );

                if (originalElement) {
                    originalElement.innerHTML = editedElement.innerHTML;
                }

                return doc.getElementById("root").innerHTML;
            });

            editedElement.style.outline = "";
            editedElement.removeAttribute("contenteditable");
            editedElement.removeEventListener("blur", handleBlur);

            selectedEl = null;
        };

        const handleClick = (e) => {
            e.preventDefault();
            e.stopPropagation();

            const target = e.target;
            setSelectedElement(target);

            // Remove previous selection
            if (selectedEl && selectedEl !== target) {
                selectedEl.style.outline = "";
                selectedEl.removeAttribute("contenteditable");
                selectedEl.removeEventListener("blur", handleBlur);
            }

            if (hoverEl) {
                hoverEl.style.outline = "";
                hoverEl = null;
            }

            selectedEl = target;

            selectedEl.style.outline = "2px solid red";
            selectedEl.setAttribute("contenteditable", "true");

            selectedEl.focus();

            selectedEl.removeEventListener("blur", handleBlur);
            selectedEl.addEventListener("blur", handleBlur);
        };

        const handleKeyDown = (e) => {
            if (e.key === "Escape" && selectedEl) {
                selectedEl.style.outline = "";
                selectedEl.removeAttribute("contenteditable");
                selectedEl.removeEventListener("blur", handleBlur);

                selectedEl.blur();

                selectedEl = null;
            }
        };

        const body = doc.body;

        body.addEventListener("mouseover", handleMouseOver);
        body.addEventListener("mouseout", handleMouseOut);
        body.addEventListener("click", handleClick);
        doc.addEventListener("keydown", handleKeyDown);

        return () => {
            body.removeEventListener("mouseover", handleMouseOver);
            body.removeEventListener("mouseout", handleMouseOut);
            body.removeEventListener("click", handleClick);
            doc.removeEventListener("keydown", handleKeyDown);

            if (selectedEl) {
                selectedEl.removeEventListener("blur", handleBlur);
            }
        };
    }, [isIframeLoaded, setGeneratedCode]);

    // Update content when generatedCode changes or iframe completes loading
    useEffect(() => {
        if (!isIframeLoaded) return;
        const iframe = iframeRef.current;
        if (!iframe) return;

        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!doc) return;

        const root = doc.getElementById('root');
        if (!root) return;

        const cleanHtml =
            generatedCode
                ?.replace(/```html/g, '')
                ?.replace(/```/g, '')
                ?.trim() || '';

        root.innerHTML = cleanHtml;

        // Reinitialize libraries after content update
        setTimeout(() => {
            try {
                if (doc.defaultView?.lucide) {
                    doc.defaultView.lucide.createIcons();
                }

                if (doc.defaultView?.AOS) {
                    doc.defaultView.AOS.init({
                        once: true,
                    });
                }
            } catch (error) {
                console.error('Iframe initialization error:', error);
            }
        }, 100);
    }, [generatedCode, isIframeLoaded]);

    const hasGeneratedCode = Boolean(generatedCode?.trim());

    return (
        <div className='flex w-full flex-col lg:flex-row'>
            <div className='flex min-w-0 flex-1 flex-col items-center p-2'>
                {isLoading ? (
                    <div className="flex h-[45vh] w-full items-center justify-center rounded-lg border bg-card sm:h-[65vh] lg:h-[85vh]" role="status">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Spinner className="size-5" /> Loading project…
                        </div>
                    </div>
                ) : hasGeneratedCode ? (
                    <>
                        <iframe
                            ref={iframeRef}
                            title="Website Preview"
                            srcDoc={HTML_code}
                            className={`${screenSize ? 'w-full max-w-sm lg:w-100' : 'w-full'} h-[45vh] rounded-lg border bg-white sm:h-[65vh] lg:h-[85vh]`}
                            sandbox="allow-scripts allow-same-origin"
                            onLoad={() => setIsIframeLoaded(true)}
                        />
                        <Tool screenSize={screenSize} setScreenSize={setScreenSize} generatedCode={generatedCode} />
                    </>
                ) : (
                    <div className="flex h-[45vh] w-full flex-col items-center justify-center rounded-lg border border-dashed bg-card px-6 text-center sm:h-[65vh] lg:h-[85vh]">
                        <FileCode2 className="size-10 text-emerald-600" />
                        <h2 className="mt-4 text-lg font-semibold">Your website preview will appear here</h2>
                        <p className="mt-2 max-w-sm text-sm text-muted-foreground">Describe what you want to build in the chat above to generate an editable interface.</p>
                    </div>
                )}
            </div>
            {hasGeneratedCode && !isLoading && (
                <Element
                    selectedEl={selectedElement}
                    setSelectedElement={setSelectedElement}
                    onCommit={() => syncElementToCode(selectedElement?.dataset?.editId)}
                />
            )}
        </div>
    );
}

export default WebsiteDes;
