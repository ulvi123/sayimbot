import React from "react";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <h1 className="text-6xl font-extrabold mb-4 animate__animated animate__fadeInDown">SayimBot-a Xoş Gəlmisiniz</h1>
            <p className="text-xl mb-8 animate__animated animate__fadeIn">Sizin mükəmməl AI güclü köməkçiniz</p>
            <button className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-full shadow-md hover:bg-gray-200 transition duration-300 transform hover:scale-105 animate__animated animate__fadeInUp">
                Başlayın
            </button>
            <p className="mt-4 text-lg animate__animated animate__fadeIn">
                Xüsusiyyətləri kəşf edin: 
                <span className="font-bold"> Danış, Öyrən və Avtomatlaşdır!</span>
            </p>
        </div>
    );
}