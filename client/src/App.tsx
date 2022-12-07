import { FormEvent, useState } from "react"
import "./App.css"

function App() {
    const [title, setTitle] = useState("")

    async function handleCreateDeck(e: FormEvent<HTMLFormElement>) {
        e.preventDefault() // Tell HTML to avoid clearing the form.

        const updated = await fetch("http://localhost:8080/api/decks", {
            method: "POST",
            body: JSON.stringify({
                title: title,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res: Response) => res.json())
            .catch((err: any) => console.error("Failed to create deck.", err))

        console.log(updated)
    }

    return (
        <div className="App">
            <h1>flashcarte</h1>
            <form action="submit" onSubmit={(e): void => handleCreateDeck(e)}>
                {/* clicking on label with A11Y htmlFor + id allows users to click on label and auto-focus the input. */}
                <div>
                    <label htmlFor="deck-title">Deck Title</label>
                    &nbsp;
                    <input
                        type="text"
                        id="deck-title"
                        value={title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setTitle(e.target.value)
                        }}
                    />
                    <button type="submit">Create Deck</button>
                </div>
            </form>
        </div>
    )
}

export default App
