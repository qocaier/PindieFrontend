"use client";
import { Banner } from "./components/Banner/Banner";
import { CardsList } from "./components/CardsListSection/CardsList";
import { Promo } from "./components/Promo/Promo";
import { useGetDataByCategory } from "./api/api-hooks";
import { Preloader } from "./components/Preloader/Preloader";
import { endpoints } from "@/app/api/config"
import { CardsListSection } from "./components/CardsListSection/CardsListSection";

export default function Home() {
    const popularGames = useGetDataByCategory(endpoints.games, "popular");
    const newGames = useGetDataByCategory(endpoints.games, "new");

    return (
        <main className={"main-inner"}>
            <Banner />
            {newGames && popularGames ? (
                <>
                    <CardsListSection type="slider" id="popular" title="Популярные" data={popularGames} />
                    <CardsListSection type="slider" id="new" title="Новинки" data={newGames} />
                </>
            ) : (
                <Preloader />
            )}
            <Promo />
        </main>
    );
}