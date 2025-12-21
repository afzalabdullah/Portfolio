# Modern Professional Portfolio

A premium, high-performance portfolio website built with React and Vanilla CSS, featuring a sleek modern design, dynamic animations, and a fully integrated CV viewer.

![Portfolio Preview](https://via.placeholder.com/1200x600?text=Portfolio+Landing+Page+Preview)

## ✨ Key Features

-   **🎯 Dynamic User Interface**: Built with modern aesthetics including glassmorphism, smooth gradients, and micro-animations.
-   **🌓 Theme Toggle**: Seamless transition between sophisticated Light and Dark modes.
-   **📄 Integrated CV Modal**: High-performance PDF viewer with internal scrolling and background scroll-lock for a premium reading experience.
-   **📱 Fully Responsive**: Optimized for all devices—from large desktops to mobile screens.
-   **✉️ Contact System**: Fully functional contact form powered by EmailJS.
-   **✨ Visual Effects**: Custom mouse background tracking effects for enhanced interactivity.
-   **🛠 Specialized Sections**:
    -   **Home**: High-impact landing area.
    -   **About**: Detailed professional background.
    -   **Skills**: categorized technical expertise (Frontend/Backend).
    -   **Biography**: Modern timeline for education and professional journey.
    -   **Work**: Filterable project gallery with Swiper integration.
    -   **Contact**: direct communication gateway.

## 🚀 Tech Stack

-   **Frontend**: React 18
-   **Styling**: Vanilla CSS (Custom Variable System)
-   **Icons**: Lucide React & React Icons
-   **Components**: 
    -   [Swiper](https://swiperjs.com/) (Interactive sliders)
    -   [react-pdf](https://github.com/wojtekmaj/react-pdf) (PDF rendering)
    -   [EmailJS](https://www.emailjs.com/) (Email integration)
-   **Animations**: Custom CSS Keyframes

## 🛠 Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone [repository-url]
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**:
    Create a `.env` file for your EmailJS credentials:
    ```env
    REACT_APP_EMAILJS_SERVICE_ID=your_service_id
    REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
    REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
    ```

4.  **Run locally**:
    ```bash
    npm start
    ```

## 📦 Building for Production

To create an optimized production build:
```bash
npm run build
```

---

*Designed and developed with ❤️ by Afzal Abdullah*
