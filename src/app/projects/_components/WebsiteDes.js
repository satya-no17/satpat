import React from 'react'

const WebsiteDes = ({generatedCode}) => {

  return (
    <div className='p-5 flex-1 border-l border-r  border-l-[#00ff88] border-b border-r-[#00ff88] h-[90vh] overflow-auto'>
      <div 
      className=''
      dangerouslySetInnerHTML={{
        __html:`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="AI Website Builder - Modern TailwindCSS + Flowbite Template">
    <title>AI Website Builder</title>

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Flowbite CSS & JS -->
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css"
    />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>

    <!-- Font Awesome Icons -->
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
    />

    <!-- Chart.js for charts & graphs -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <!-- AOS (Animate On Scroll) -->
    <link
        href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css"
        rel="stylesheet"
    />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>

    <!-- GSAP (GreenSock) -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

    <!-- Lottie for JSON-based animations -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.11.2/lottie.min.js"></script>

    <!-- Swiper.js for sliders/carousels -->
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css"
    />
    <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>

    <!-- Optional: Tooltip & Popover Library (Tippy.js) -->
    <link
        rel="stylesheet"
        href="https://unpkg.com/tippy.js@6/dist/tippy.css"
    />
    <script src="https://unpkg.com/@popperjs/core@2"></script>
    <script src="https://unpkg.com/tippy.js@6"></script>
</head>

<body>
    ${generatedCode}
</body>
</html>`
      }}
      >

      </div>
    </div>
  )
}

export default WebsiteDes