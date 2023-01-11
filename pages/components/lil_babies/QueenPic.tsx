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
