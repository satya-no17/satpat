import { Code2, Copy, Download, DownloadIcon, Expand, Laptop, Smartphone } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



const Tool = ({ screenSize, setScreenSize, generatedCode }) => {
  const HTML_code = ` <!DOCTYPE html>
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
                <div>${generatedCode}</div>
            </body>
            </html>`

  const downloadInHtml = () => {
    if (!HTML_code) return

    const blob = new Blob([HTML_code], {
      type: 'text/html'
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = "Satpat.html"
    a.click()

    URL.revokeObjectURL(url)
  }
  const ViewinNewTab = () => {
    if (!generatedCode) return
    const cleanCode = (HTML_code || '')
      .replaceAll('```html', '')
      .replace('```', '')
      .replace('html', '')

    const blob = new Blob([cleanCode], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    window.open(url, "_blank")
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      alert("Copied!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  return (
    <div className='flex justify-between items-center p-2.5 pb-0 w-full'>
      <div className='flex justify-between gap-2'>
        <Button variant='ghost' className={`${screenSize ? 'border-primary' : ''}`} onClick={() => setScreenSize(true)}> <Smartphone /> </Button>
        <Button variant='ghost' className={`${screenSize == false ? 'border-primary' : ''}`} onClick={() => setScreenSize(false)}><Laptop /></Button>
      </div>
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Code<Code2 /></Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Code</DialogTitle>
              <DialogDescription className={`flex justify-between items-center`}>
                Your Code is in html Format   <Button onClick={() => (copyCode())}><Copy /></Button>
              </DialogDescription>
            </DialogHeader>
            <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
              <SyntaxHighlighter language="javascript" style={docco}>
                {generatedCode}
              </SyntaxHighlighter>
            </div>
          </DialogContent>
        </Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button >Download <DownloadIcon /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Download</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => downloadInHtml()}>Plain</DropdownMenuItem>
              <DropdownMenuItem>React</DropdownMenuItem>        </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button onClick={() => ViewinNewTab()}>View <Expand /></Button>

      </div>
    </div>
  )
}

export default Tool