"use client";

import React, { useState } from 'react';

// --- MOCK DATA: Obras de arte para la demo ---
// SUSTITUYE LOS ENLACES DE 'placehold.co' POR TUS PROPIOS ENLACES DE IMÁGENES .JPG
const artPieces = [
    {
        id: 1,
        title: 'Las Meninas',
        artist: 'Diego Velázquez',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Las_Meninas_01.jpg',
        vibe: 'Realismo',
        vibeScore: 1
    },
    {
        id: 2,
        title: 'El Jardín de las Delicias',
        artist: 'El Bosco',
        imageUrl: 'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/77KYFY4HLFEWJMIUUVLUWOWJDY.jpg',
        vibe: 'Fantasia',
        vibeScore: 1
    },
    {
        id: 3,
        title: 'Saturno devorando a su hijo',
        artist: 'Francisco de Goya',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkVk-JraxwJNaA-fGtgGmuB6gHAb70skcZbA&s',
        vibe: 'Misterio',
        vibeScore: 1
    },
    {
        id: 4,
        title: 'El 3 de mayo en Madrid',
        artist: 'Francisco de Goya',
        imageUrl: 'https://c8.alamy.com/zooms/9/c470017726cc4f0a96c23905caff59f6/2bwhd8m.jpg',
        vibe: 'Drama',
        vibeScore: 1
    },
    {
        id: 5,
        title: 'El Aquelarre',
        artist: 'Francisco de Goya',
        imageUrl: 'https://fundaciongoyaenaragon.es/files/resize/800x600/files/images/526_4.7.49.JPG',
        vibe: 'Misterio',
        vibeScore: 1
    },
    {
        id: 6,
        title: 'Las tres Gracias',
        artist: 'Peter Paul Rubens',
        imageUrl: 'https://www.todocuadros.es/cdn/shop/files/rubens-tres-gracias-prado-livingroom-8-ver4.jpg?v=1753186185&width=1739',
        vibe: 'Fantasia',
        vibeScore: 1
    },
    {
        id: 7,
        title: 'El caballero de la mano en el pecho',
        artist: 'El Greco',
        imageUrl: 'https://content3.cdnprado.net/imagenes/Documentos/imgsem/9c/9cb7/9cb73bdf-66e8-4826-a79c-5de2b15a1da6/bf8475d4-1066-4fda-b2a9-1dd3e39e5ced_832.jpg',
        vibe: 'Realismo',
        vibeScore: 1
    },
    {
        id: 8,
        title: 'El Descendimiento',
        artist: 'Rogier van der Weyden',
        imageUrl: 'https://content3.cdnprado.net/imagenes/Documentos/imgsem/69/697b/697b0838-a6c2-4fc7-85e4-41280f526b43/13d2029c-b0c4-4e75-a434-7cf8768eeb27.jpg',
        vibe: 'Drama',
        vibeScore: 1
    }
];

// --- COMPONENTE PRINCIPAL ---
export default function Page() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [scores, setScores] = useState({ Misterio: 0, Fantasia: 0, Realismo: 0, Drama: 0 });

    // Función para manejar las decisiones del usuario
    const handleSwipe = (liked: boolean) => {
        const currentPiece = artPieces[currentIndex];

        if (liked) {
            // Sumar puntos a la "vibra" de la obra si le gusta
            setScores(prev => ({
                ...prev,
                [currentPiece.vibe]: prev[currentPiece.vibe as keyof typeof prev] + currentPiece.vibeScore
            }));
        }

        // Pasar a la siguiente obra o mostrar resultados
        if (currentIndex < artPieces.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setShowResult(true);
        }
    };

    // Función para calcular la vibra ganadora
    const getWinningVibe = () => {
        return Object.keys(scores).reduce((a, b) => scores[a as keyof typeof scores] > scores[b as keyof typeof scores] ? a : b);
    };

    // Función para reiniciar la demo
    const resetDemo = () => {
        setCurrentIndex(0);
        setShowResult(false);
        setScores({ Misterio: 0, Fantasia: 0, Realismo: 0, Drama: 0 });
    };

    // --- PANTALLA DE RESULTADOS ---
    if (showResult) {
        const winningVibe = getWinningVibe();

        // Diccionario de resultados apuntando a museos reales
        const resultsData = {
            Misterio: {
                title: "Ruta de las Sombras 🌑",
                museum: "Museo Nacional del Prado",
                route: "Ve a la Planta 0 y sumérgete en las inquietantes Pinturas Negras de Goya (Salas 67 y 68)."
            },
            Fantasia: {
                title: "Ruta de los Sueños y Mitos ✨",
                museum: "Museo Nacional del Prado",
                route: "Ve a la Planta 0 (Sala 56A) para alucinar con el surrealismo de El Bosco y busca los mitos de Rubens en la Sala 29."
            },
            Realismo: {
                title: "Ruta de la Corte y la Verdad 👑",
                museum: "Museo Nacional del Prado",
                route: "Tu destino principal es la gran Sala 12 (Planta 1) para ver a Velázquez, y los retratos hiperrealistas de El Greco."
            },
            Drama: {
                title: "Ruta de la Pasión y la Tragedia 🎭",
                museum: "Museo Nacional del Prado",
                route: "Busca la fuerza de los fusilamientos de Goya y el dramatismo de la pintura flamenca (Planta 0)."
            }
        };

        const result = resultsData[winningVibe as keyof typeof resultsData];

        return (
            <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 font-sans">
                <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-8 text-center border border-gray-700">
                    <h1 className="text-3xl font-bold mb-2 text-indigo-400">¡Tu Perfil Museístico!</h1>
                    <p className="text-gray-400 mb-6">Tus elecciones revelan que eres un perfil:</p>

                    <div className="bg-gray-700 rounded-xl p-6 mb-6 border border-indigo-500/30 shadow-inner">
                        <h2 className="text-2xl font-black text-white mb-2">Perfil: {winningVibe}</h2>
                    </div>

                    <div className="text-left bg-gray-900/50 p-5 rounded-lg border border-indigo-500/50 mb-8">
                        <h3 className="font-semibold text-indigo-300 mb-2 flex items-center text-lg">
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            Selección para ti:
                        </h3>
                        <p className="text-white font-bold text-xl mb-3">{result.title}</p>
                        <div className="h-px w-full bg-gray-700 mb-3"></div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            <span className="font-semibold text-indigo-400">📍 {result.route}</span>
                        </p>
                    </div>

                    <button
                        onClick={resetDemo}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition duration-200 transform hover:scale-105 active:scale-95"
                    >
                        Volver a empezar
                    </button>
                </div>
            </div>
        );
    }

    // --- PANTALLA PRINCIPAL (SWIPE) ---
    const currentPiece = artPieces[currentIndex];

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 sm:p-6 font-sans">

            {/* Header App */}
            <div className="text-center mb-6">
                <h1 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                    MuseMatch <span className="text-indigo-500/50 text-xl font-light">| Prado</span>
                </h1>
                <p className="text-gray-400 text-sm mt-1">Conecta con las obras maestras del Prado</p>
            </div>

            {/* Tarjeta de la Obra (Card) */}
            <div className="relative w-full max-w-sm aspect-[4/5] bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-700 group transition-all duration-300">

                {/* Imagen corregida con etiqueta img estándar */}
                <img
                    src={currentPiece.imageUrl}
                    alt={currentPiece.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                />

                {/* Gradiente oscuro abajo para leer el texto */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                {/* Información de la obra */}
                <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                    <p className="text-indigo-300 text-xs font-bold uppercase tracking-wider mb-1">
                        Obra {currentIndex + 1} de {artPieces.length}
                    </p>
                    <h2 className="text-2xl font-bold text-white mb-1 shadow-black drop-shadow-md">
                        {currentPiece.title}
                    </h2>
                    <p className="text-gray-300 text-sm">
                        {currentPiece.artist}
                    </p>
                </div>
            </div>

            {/* Controles de Acción (Botones) */}
            <div className="flex gap-6 mt-8">
                <button
                    onClick={() => handleSwipe(false)}
                    className="w-16 h-16 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-3xl hover:bg-red-500/20 hover:border-red-500 hover:text-red-500 transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-lg"
                    aria-label="No me gusta"
                >
                    ❌
                </button>
                <button
                    onClick={() => handleSwipe(true)}
                    className="w-16 h-16 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-3xl hover:bg-green-500/20 hover:border-green-500 hover:text-green-500 transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-lg"
                    aria-label="Me gusta"
                >
                    💚
                </button>
            </div>

            {/* Instrucción visual explícita */}
            <p className="mt-8 text-indigo-300/80 font-medium text-sm animate-pulse tracking-wide uppercase">
                👇 Pulsa ❌ o 💚 para evaluar y pasar a la siguiente 👇
            </p>

        </div>
    );
}
