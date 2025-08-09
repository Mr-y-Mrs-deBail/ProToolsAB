const allSearchableItems = [
    {
        id: "circuit", 
        url: "index.html#circuit", 
        title: {
            en: "Circuit Tester Kit",
            es: "Kit de Probador de Circuitos"
        },
        type: {
            en: "Electrical Product",
            es: "Producto de Electricidad"
        },
        price: 79.99,
        image: "img/circuit1.png" 
    },
    {
        id: "destornillador",
        url: "index.html#destornillador",
        title: {
            en: "13-Piece Insulated Screwdriver Set",
            es: "Juego de Destornilladores Aislados de 13 Piezas"
        },
        type: {
            en: "Electrical Product",
            es: "Producto de Electricidad"
        },
        price: 23.69,
        image: "img/destornillador1.webp" 
    },
    {
        id: "multimeter",
        url: "index.html#multimeter",
        title: {
            en: "Multimeter Kit",
            es: "Kit de Multímetro"
        },
        type: {
            en: "Electrical Product",
            es: "Producto de Electricidad"
        },
        price: 39.97,
        image: "img/kit1.webp" 
    },
    {
        id: "crimper-stripper",
        url: "index.html#crimper-stripper",
        title: {
            en: "Crimper + Stripper Kit",
            es: "Kit de Engarzador + Pelacables"
        },
        type: {
            en: "Electrical Product",
            es: "Producto de Electricidad"
        },
        price: 41.99,
        image: "img/pelacables1.webp" 
    },

    {
        id: "tape-measure",
        url: "index.html#tape-measure",
        title: {
            en: "Tape Measure",
            es: "Cinta Métrica"
        },
        type: {
            en: "Tool",
            es: "Herramienta"
        },
        price: 23.96,
        image: "img/metro1.webp" 
    },
    {
        id: "hand-tool-set",
        url: "index.html#hand-tool-set",
        title: {
            en: "Hand Tool Set",
            es: "Juego de Herramientas Manuales"
        },
        type: {
            en: "Tool",
            es: "Herramienta"
        },
        price: 37.89,
        image: "img/caja1.png" 
    },
    {
        id: "drill-bit-set",
        url: "index.html#drill-bit-set",
        title: {
            en: "Drill Bit Set Titanium",
            es: "Juego de Brocas de Titanio"
        },
        type: {
            en: "Tool",
            es: "Herramienta"
        },
        price: 8.59,
        image: "img/drill1.webp" 
    },
    {
        id: "foldable",
        url: "index.html#foldable",
        title: {
            en: "Foldable Level",
            es: "Nivel Plegable"
        },
        type: {
            en: "Tool",
            es: "Herramienta"
        },
        price: 31.99,
        image: "img/nivelador1.webp" 
    },

    {
        id: "garlopa",
        url: "index.html#garlopa",
        title: {
            en: "Brushless Planer",
            es: "Cepillo Eléctrico Sin Escobillas"
        },
        type: {
            en: "Carpentry Tool",
            es: "Herramienta de Carpintería"
        },
        price: 163.99,
        image: "img/garlopa1.webp" 
    },
    {
        id: "trimmer",
        url: "index.html#trimmer",
        title: {
            en: "Trimmer",
            es: "Recortadora"
        },
        type: {
            en: "Carpentry Tool",
            es: "Herramienta de Carpintería"
        },
        price: 7.99,
        image: "img/recortadora1.webp" 
    },
    {
        id: "ruler-3d",
        url: "index.html#ruler-3d",
        title: {
            en: "3D Multi-Angle Measuring Ruler",
            es: "Regla de Medición Multiángulo 3D"
        },
        type: {
            en: "Carpentry Tool",
            es: "Herramienta de Carpintería"
        },
        price: 13.99,
        image: "img/regla1.webp" 
    },

    {
        id: "jardin",
        url: "index.html#jardin",
        title: {
            en: "Garden Tool Set",
            es: "Juego de Herramientas de Jardinería"
        },
        type: {
            en: "Gardening Tool",
            es: "Herramienta de Jardinería"
        },
        price: 27.99,
        image: "img/jardineria1.webp" 
    },

    {
        id: "contact", 
        url: "contact.html#contact",
        title: {
            en: "About Us",
            es: "Sobre Nosotros"
        },
        type: {
            en: "Company Information",
            es: "Información de la Empresa"
        }
    },
    {
        id: "contact",
        url: "contact.html#contact",
        title: {
            en: "Contact Us",
            es: "Contáctanos"
        },
        type: {
            en: "Support",
            es: "Soporte"
        }
    },
    {
        id: "carritoshop",
        url: "carrito.html#carritoshop",
        title: {
            en: "Your Cart",
            es: "Tu carrito"
        },
        type: {
            en: "Shopping Process",
            es: "Proceso de Compra"
        }
    },
    {
        id: "checkout",
        url: "carrito.html#proceed-to-checkout-button",
        title: {
            en: "Proceed To Checkout",
            es: "Finalizar Compra"
        },
        type: {
            en: "Shopping Process",
            es: "Proceso de Compra"
        }
    },
    {
        id: "operating-hours",
        url: "#footer",
        title: {
            en: "Operating Hours",
            es: "Horarios de Atención"
        },
        type: {
            en: "Company Information",
            es: "Información de la Empresa"
        }
    },
    {
        id: "store-hours",
        url: "#footer",
        title: {
            en: "Store Hours",
            es: "Horario de Tienda"
        },
        type: {
            en: "Company Information",
            es: "Información de la Empresa"
        }
    },
    {
        id: "offers-section",
        url: "index.html#team-carousel",
        title: {
            en: "Special Offers",
            es: "Ofertas Especiales"
        },
        type: {
            en: "Promotions",
            es: "Promociones"
        }
    },
    {
        id: "discounts-section",
        url: "index.html#team-carousel",
        title: {
            en: "Discounts",
            es: "Descuentos"
        },
        type: {
            en: "Promotions",
            es: "Promociones"
        }
    },
    {
        id: "consulting-construction",
        url: "index.html#services",
        title: {
            en: "Consulting and Construction Services",
            es: "Servicios de Consultoría y Construcción"
        },
        type: {
            en: "Our Services",
            es: "Nuestros Servicios"
        },
    },
    {
        id: "galeria",
        url: "index.html#services",
        title: {
            en: "Tailored Home Solutions",
            es: "Soluciones Personalizadas para el Hogar"
        },
        type: {
            en: "Our Services",
            es: "Nuestros Servicios"
        }
    },
    {
        id: "remodeling-service",
        url: "index.html#services",
        title: {
            en: "Home Remodeling",
            es: "Remodelación de Hogares"
        },
        type: {
            en: "Construction Service",
            es: "Servicio de Construcción"
        },
        image: "img/servicio1.jpg"
    },
    {
        id: "paint-service",
        url: "index.html#services",
        title: {
            en: "Painting",
            es: "Pintura"
        },
        type: {
            en: "Painting Service",
            es: "Servicio de Pintura"
        },
        image: "img/servicio2.jpg"
    },
    {
        id: "electrical-service",
        url: "index.html#services",
        title: {
            en: "Electrical",
            es: "Eléctricos"
        },
        type: {
            en: "Electrical Services",
            es: "Servicios Eléctricos"
        },
        image: "img/servicio3.jpg"
    },
    {
        id: "flooring-service",
        url: "index.html#services",
        title: {
            en: "Flooring Installation",
            es: "Instalación de Pisos"
        },
        type: {
            en: "Construction Service",
            es: "Servicio de Construcción"
        },
        image: "img/servicio4.jpg"
    },
    {
        id: "moving-service",
        url: "index.html#services",
        title: {
            en: "Moving Services",
            es: "Servicios de Mudanza"
        },
        type: {
            en: "General Service",
            es: "Servicio General"
        },
        image: "img/servicio5.jpg"
    },
    {
        id: "plumbing-service",
        url: "index.html#services",
        title: {
            en: "Plumbing Services",
            es: "Servicios de Fontanería"
        },
        type: {
            en: "Construction Service",
            es: "Servicio de Construcción"
        },
        image: "img/servicio6.jpg"
    },
    {
        id: "drywall-service",
        url: "index.html#services",
        title: {
            en: "Drywall Installation",
            es: "Instalación de Yeso" 
        },
        type: {
            en: "Construction Service",
            es: "Servicio de Construcción"
        },
        image: "img/servicio7.jpg"
    },
    {
        id: "cabinets-service",
        url: "index.html#services",
        title: {
            en: "Cabinet Installation",
            es: "Instalación de Gabinetes"
        },
        type: {
            en: "Construction Service",
            es: "Servicio de Construcción"
        },
        image: "img/servicio8.jpg"
    },
    {
        id: "contact-services",
        url: "contact.html", 
        title: {
            en: "Contact for Service Information",
            es: "Contacto para Información de Servicios"
        },
        type: {
            en: "Support & Services",
            es: "Soporte y Servicios"
        }
    },
    {
        id: "call-us-services",
        url: "tel:+15104444444",
        title: {
            en: "Call Us for Services",
            es: "Llámanos por Servicios"
        },
        type: {
            en: "Support & Services",
            es: "Soporte y Servicios"
        }
    }
];