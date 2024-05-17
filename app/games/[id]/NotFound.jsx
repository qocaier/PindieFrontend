import Styles from "./Game.module.css";

export const GameNotFound = () => {
    return (
        <section className={Styles['game']}>
            <p>Такой игры не существует 😢</p>
        </section>
    )
}