import Image from 'next/image'
import Queen from "../../classes/Queen";

type QueenPicProps = {
    queen: Queen,
    color?: string
}

export default function QueenPic(props: QueenPicProps) {
    const picStyle = {
        'border-color': props.color || "black"
    };

    return (
        <Image src={props.queen.getImage()} alt={props.queen.getName()} width={105} height={105} /*style={picStyle}*//> // "border-color" doesn't work while not in quotes but won't let me put it in quotes either idk
    );
}

/* let image = document.createElement("img");
image.src = source;
image.setAttribute("style", `border-color: ${color}; width: 105px; height: 105px;`); */