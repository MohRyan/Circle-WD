import { useEffect, useState } from "react";

const useScroll = () => {
    const [show, setShow] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    window.addEventListener("scroll", function () {
        const header = this.document.querySelector(".post");
        header?.classList.toggle("navFixed", this.window.scrollY > lastScrollY);
        setLastScrollY(this.window.scrollY)
    });
    useEffect(() => {
        window.addEventListener('scroll', function () {
            if (window.scrollY > lastScrollY) {
                // Scroll ke bawah
                setShow(true);
            } else {
                // Scroll ke atas
                setShow(false);
            }
            setLastScrollY(window.scrollY);
        });
        return () => {
            window.removeEventListener('scroll', function () {
                if (window.scrollY > lastScrollY) {
                    // Scroll ke bawah
                    setShow(true);
                } else {
                    // Scroll ke atas
                    setShow(false);
                }
                setLastScrollY(window.scrollY);
            });
        };
    }, [lastScrollY]);

    return {
        show,
        lastScrollY,
        setLastScrollY
    }
}

export default useScroll