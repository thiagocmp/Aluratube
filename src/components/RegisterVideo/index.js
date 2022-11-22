import { createClient } from "@supabase/supabase-js";
import React from "react"
import { StyledRegisterVideo } from "./Styles";

function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues)

    return {
        values,
        handleChange: (evento) => {
            const value = evento.target.value
            const name = evento.target.name
            setValues({
                ...values,
                [name]: value,
            })
        },
        clearForm() {
            setValues({})
        }
    }
}

const PROJECT_URL = "https://zsspgmkaxjwphmjggiad.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpzc3BnbWtheGp3cGhtamdnaWFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg1NjAwOTIsImV4cCI6MTk4NDEzNjA5Mn0.M7BPYPyXnlgJPcNyhu9Ub-lEctFvAAsak5SYAjeJGzE"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`
}

export default function RegisterVideo () {
    const formCadastro = useForm({ 
        initialValues: { titulo: "", url: "" }
    })
    const [formVisivel, setFormVisivel] = React.useState(false)

    console.log()
    
    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {formVisivel
                ? (
                    <form onSubmit={(evento) =>{
                        evento.preventDefault()
                        console.log(formCadastro.values)
                        
                        supabase.from("Videos").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: getThumbnail(formCadastro.values.url),
                            playlist: "",
                        })
                        .then((oqveio) => {
                            console.log(oqveio)
                        })
                        .catch((err) => {
                            console.log(err)
                        })

                        setFormVisivel(false)
                        formCadastro.clearForm()
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                                X
                            </button>
                                <input 
                                    placeholder="Titulo do video" 
                                    name="titulo"
                                    value={formCadastro.values.titulo} 
                                    onChange={formCadastro.handleChange} 
                                /> 
                            <input 
                                placeholder="URL"
                                name="url"
                                value={formCadastro.values.url} 
                                onChange={formCadastro.handleChange}
                            />
                            <button type="submit">
                                Cadastrar
                            </button>
                        </div>
                </form>
                )     
            : false}
        </StyledRegisterVideo>
    )
}
