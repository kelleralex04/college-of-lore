// import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SubjectHome({campaign, category}) {
    let { subjectId } = useParams();

    return(
        <h1>{subjectId}</h1>
    )
}