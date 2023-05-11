'use client'
import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
    const [userId, setUserId] = useState(0);
    const [postDetail, setPostDetail] = useState({
        id: 45712,
        title: 'taladro eléctrico de mano usado',
        price: 50,
        description: 'este taladro eléctrico de mano es ideal para realizar trabajos de perforación en madera, metal, plástico y otros materiales. Ha sido previamente utilizado, pero se encuentra en buen estado y funciona correctamente. El taladro cuenta con una potencia de 500 vatios y una velocidad variable de hasta 3000 RPM. Además, incluye una broca para comenzar a trabajar de inmediato.',
        categories: ['herramientas', 'taladros, herramientas electricas'],
        author: {
            id: 1,
            username: 'JuanPerez88',
            rating: 1.0,
            image_perfil: 'https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg'
        },
        images: [
            'https://us.123rf.com/450wm/godruma/godruma1802/godruma180200012/95380266-taladro-manual-o-m%C3%A1quina-de-perforaci%C3%B3n-equipada-con-un-accesorio-de-herramienta-de-corte-o-de.jpg',
            'https://us.123rf.com/450wm/vivacityimages/vivacityimages2004/vivacityimages200400051/144863343-vista-lateral-del-taladro-manual-a-bater%C3%ADa.jpg'
        ],
        type: 'vender'
    })


    const [selectedCategory, setSelectedCategory] = useState('');    
    const [name, setName] = useState('');
    const [cards, setCards] = useState([]);   

    return (
        <AppContext.Provider value={{            
            postDetail,
            setPostDetail,
            cards,
            setCards,
            selectedCategory,
            setSelectedCategory,
            name,
            setName,
            userId,
            setUserId,
        }}>
            {children}
        </AppContext.Provider >
    );
}

export { AppProvider, AppContext };