'use client';

import React, { useEffect, useRef, useState } from 'react';
import Tool from './Tool';
import Element from './Element';


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

function WebsiteDes({ generatedCode, setGeneratedCode }) {
    const iframeRef = useRef(null);
    const [screenSize, setScreenSize] = useState(false);
    const [isIframeLoaded, setIsIframeLoaded] = useState(false);

    // Fallback: check if the iframe is already loaded on mount
    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe && iframe.contentDocument && (iframe.contentDocument.readyState === 'complete' || iframe.contentDocument.readyState === 'interactive')) {
            setIsIframeLoaded(true);
        }
    }, []);

    // useEffect(() => {

    //     if (!isIframeLoaded) return;
    //     const iframe = iframeRef.current;
    //     if (!iframe) return;
    //     const doc = iframe.contentDocument || iframe.contentWindow?.document;
    //     if (!doc) return;

    //     let hoverEl = null;
    //     let selectedEl = null;

    //     const handleMouseOver = (e) => {
    //         if (selectedEl) return;
    //         const target = e.target;
    //         if (hoverEl && hoverEl !== target) {
    //             hoverEl.style.outline = "";
    //         }
    //         hoverEl = target;
    //         hoverEl.style.outline = "2px dotted blue";
    //     };

    //     const handleMouseOut = (e) => {
    //         if (selectedEl) return;
    //         if (hoverEl) {
    //             hoverEl.style.outline = "";
    //             hoverEl = null;
    //         }
    //     };

    //     const handleClick = (e) => {
    //         e.preventDefault();
    //         e.stopPropagation();
    //         const target = e.target;

    //         if (selectedEl && selectedEl !== target) {
    //             selectedEl.style.outline = "";
    //             selectedEl.removeAttribute("contenteditable");
    //         }

    //         selectedEl = target;
    //         selectedEl.style.outline = "2px solid red";
    //         selectedEl.setAttribute("contenteditable", "true");
    //         selectedEl.focus();
    //         console.log("Selected element:", selectedEl);
    //     };

    //     const handleBlur = () => {
    //         if (selectedEl) {
    //             console.log("Final edited element:", selectedEl.outerHTML);
    //         }
    //     };

    //     const handleKeyDown = (e) => {
    //         if (e.key === "Escape" && selectedEl) {
    //             selectedEl.style.outline = "";
    //             selectedEl.removeAttribute("contenteditable");
    //             selectedEl.removeEventListener("blur", handleBlur);
    //             selectedEl = null;
    //         }
    //     };

    //     const body = doc.body;
    //     if (body) {
    //         body.addEventListener("mouseover", handleMouseOver);
    //         body.addEventListener("mouseout", handleMouseOut);
    //         body.addEventListener("click", handleClick);
    //     }
    //     doc.addEventListener("keydown", handleKeyDown);

    //     // Cleanup on unmount
    //     return () => {
    //         if (body) {
    //             body.removeEventListener("mouseover", handleMouseOver);
    //             body.removeEventListener("mouseout", handleMouseOut);
    //             body.removeEventListener("click", handleClick);
    //         }
    //         doc.removeEventListener("keydown", handleKeyDown);
    //     };
    // }, [isIframeLoaded]);


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

            console.log(
                "Selected:",
                selectedEl.dataset.editId,
                selectedEl
            );
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

    return (
        <div className='flex w-full'>
            <div className='flex items-center flex-col w-full p-2'>
                <iframe
                    ref={iframeRef}
                    title="Website Preview"
                    srcDoc={HTML_code}
                    className={`${screenSize ? 'w-100' : 'w-full'} h-[85vh] border rounded-lg bg-white `}
                    sandbox="allow-scripts allow-same-origin"
                    onLoad={() => setIsIframeLoaded(true)}
                />
                <Tool screenSize={screenSize} setScreenSize={setScreenSize} generatedCode={generatedCode} />
            </div>
            <Element/>
        </div>
    );
}

export default WebsiteDes;