import Queen from "../../classes/Queen";

type QueenPicProps = {
    queen: Queen
    color: string
}

export default function QueenPic(props: QueenPicProps) {
    return (
        <img src="" /*style=""*/></img>
    );
}

/* let image = document.createElement("img");
image.src = source;
image.setAttribute("style", `border-color: ${color}; width: 105px; height: 105px;`); */