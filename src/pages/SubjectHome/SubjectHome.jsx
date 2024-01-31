// import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SubjectHome({campaign, category}) {
    let { subjectId } = useParams();

    // useEffect(function() {
    //     function getCurCategory() {
    //         const curCategory = campaign.category.find((c) => c.name === categoryId);
    //         setCategory(curCategory)
    //     }
    //     getCurCategory();
    // }, [categoryId]);

    return(
        <h1>{subjectId}</h1>
    )
}