import Image from 'next/image'
import Queen from "../../classes/competitors/Queen";

type QueenPicProps = {
    queen: Queen,
    color?: string
}

export default function QueenPic(props: QueenPicProps) {
    const picStyle = {
        borderColor: props.color || "black"
    };

    return (
        <Image src={props.queen.image} alt={props.queen.name} width={105} height={105} style={picStyle} />
    );
}


// "border-color" doesn't work while not in quotes but won't let me put it in quotes either idk

// rn I have borderColor but that's not actually taking effect, who knows







/* let image = document.createElement("img");
image.src = source;
image.setAttribute("style", `border-color: ${color}; width: 105px; height: 105px;`); */