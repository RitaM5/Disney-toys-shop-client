import React, { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";
import AllToysCard from '../../Shared/AllToysSection/AllToysCard';
import CategoryCard from './CategoryCard';
const ShopCategory = () => {
    const [toys, setToys] = useState([]);
    const [category, setCategory] = useState("");
    useEffect(() => {
        fetch(`https://disney-dolls-server.vercel.app/products/${category}`)
            .then(res => res.json())
            .then(data => {
                setToys(data)
            })
    }, [category]);
    const handleTabClick = (tabName) => {
        setCategory(tabName);
    };
    return (
        <div className='my-container text-center'>
            <h1 className='font-semibold underline underline-offset-4 text-2xl text-center mb-4'>Shop By Category</h1>
            <p className='text-center my-2'>Select the categories and buy the favorite dolls for your babies !!</p>
            <Marquee>
                <div className='grid gap-2 grid-cols-1 md:grid-cols-3 items-center mt-8'>
                    <button onClick={() => handleTabClick("disney")} className="btn rounded-3xl btn-active btn-primary">Disney Princes</button>
                    <button onClick={() => handleTabClick("frozen")} className="btn rounded-3xl btn-active btn-secondary">Frozen Dolls</button>
                    <button onClick={() => handleTabClick("animation")} className="btn rounded-3xl text-white btn-active btn-accent">Animation Characters</button>
                </div>
            </Marquee>
            <div data-aos="fade-up"
                data-aos-duration="2000" className='my-14 grid gap-6 grid-cols-1 lg:grid-cols-3 md:grid-cols-2'>
                {
                   toys.map(toy => <CategoryCard
                        key={toy._id}
                        toy={toy}
                    ></CategoryCard>)
                }
            </div>
        </div>
    );
};

export default ShopCategory;
/* 
   <div data-aos="fade-up"
                data-aos-duration="2000" className='my-10 grid gap-6 grid-cols-1 lg:grid-cols-3 md:grid-cols-2'>
                {
                    products.map(product => <AllToysCard
                        key={product._id}
                        product={product}
                    ></AllToysCard>)
                }
            </div>
*/