'use client';

import React, { useEffect, useRef, useState } from 'react';
import Tool from './Tool';

function WebsiteDes({ generatedCode }) {
    const iframeRef = useRef(null);
    const [screenSize, setScreenSize] = useState(false)

    // Initialize iframe once
    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!doc) return;

        doc.open();
        doc.write(`
            <!DOCTYPE html>
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

                <!-- AOS -->
                <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css"
                    rel="stylesheet"
                />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>

                <!-- GSAP -->
                <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

                <!-- Lottie -->
                <script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.11.2/lottie.min.js"></script>

                <!-- Swiper -->
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css"
                />
                <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>

                <!-- Tippy -->
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/tippy.js@6/dist/tippy.css"
                />
                <script src="https://unpkg.com/@popperjs/core@2"></script>
                <script src="https://unpkg.com/tippy.js@6"></script>

                <style>
                    body {
                        margin: 0;
                        padding: 0;
                    }
                </style>
            </head>
            <body>
                <div id="root"></div>
            </body>
            </html>
        `);
        doc.close();
    }, []);

    // Update content when generatedCode changes
    useEffect(() => {
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

                if (doc.defaultView?.Flowbite) {
                    // Flowbite auto initializes
                }
            } catch (error) {
                console.error('Iframe initialization error:', error);
            }
        }, 100);
    }, [generatedCode]);

    return (
       <div className='flex items-center flex-col w-full p-2'>
         <iframe
            ref={iframeRef}
            title="Website Preview"
            className={`${screenSize?'w-100':'w-full'} h-[85vh] border rounded-lg bg-white `}
            sandbox="allow-scripts allow-same-origin"
        />
        <Tool screenSize={screenSize} setScreenSize={setScreenSize}/>
       </div>
    );
}

export default WebsiteDes;