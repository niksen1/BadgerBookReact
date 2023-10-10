const Student = (props) => {
    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        <p>Major: {props.major}</p>
        <p>Number of Credits: {props.numCredits}</p>
        <p>From Wisconsin: {props.fromWisconsin ? 'Yes' : 'No'}</p>
        <p>Interests: {props.interests.length}</p>
        <ul>
            {props.interests.map((interest, index) => (
            <li key={index}>{interest}</li>
            ))}
        </ul>
    </div>
}

export default Student;