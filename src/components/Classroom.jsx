import { Button, Container, Form, Row, Col, Pagination } from "react-bootstrap";
import { useEffect, useState } from "react"
import Student from "./Student";

const Classroom = () => {
    const [students, setStudents] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchMajor, setSearchMajor] = useState("");
    const [searchInterest, setSearchInterest] = useState("");
    const [shownStudents, setShownStudents] = useState([]);
    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        fetch("https://cs571.org/api/f23/hw4/students", {
            headers: {
                "X-CS571-ID": "bid_b17011e15e08e0a932b9fbe1084a58619b81e6dfd03fd7e2ac6bdd8ff6a75367"
            }
        })
        .then(response => response.json())
        .then(data => {
            setStudents(data)
            console.log(students)
        })
    }, [])

    
    useEffect(() => {

        const filteredStudents = students.filter((student) =>
          filterStudent(student)
        );
        setShownStudents(filteredStudents);
    }, [students, searchName, searchMajor, searchInterest]);

    
    const filterStudent = (student) => {
        const SearchNameValue = searchName.toLowerCase().trim();
        const SearchMajorValue = searchMajor.toLowerCase().trim();
        const SearchInterestValue = searchInterest.toLowerCase().trim();

        return (

            (`${student.name.first} ${student.name.last}`.toLowerCase().includes(SearchNameValue)) &&
            (student.major.toLowerCase().includes(SearchMajorValue)) &&
            (student.interests.some((interest) => interest.toLowerCase().includes(SearchInterestValue))
            )
        );
    };

    const handleResetSearch = () => {

        setSearchName("");
        setSearchMajor("");
        setSearchInterest("");
        setShownStudents(students);
        setActivePage(1);
    };
    
    const buildPaginator = () => {
        let pages = [];
        const num_pages = Math.ceil(shownStudents.length / 24);
    
        pages.push(
            <Pagination.Prev key="prev" onClick={() => setActivePage((prev) => Math.max(prev - 1, 1))} disabled={activePage === 1}>
                Previous
            </Pagination.Prev>
        );
    
        for (let i = 1; i <= num_pages; i++) {
            pages.push(
                <Pagination.Item key={i} active={activePage === i} onClick={() => setActivePage(i)} >
                    {i}
                </Pagination.Item>
            );
        }
    
        pages.push(
            <Pagination.Next key="next" onClick={() => setActivePage((prev) => Math.min(prev + 1, num_pages))} disabled={activePage === num_pages}>
                Next
            </Pagination.Next>
        );

        return pages;
    };


    return <div>
        <h1>Badger Book - Fall 2023</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control
             id="searchName"
             value={searchName}
             onChange={(e) => setSearchName(e.target.value)}
            />
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control
             id="searchMajor"
             value={searchMajor}
             onChange={(e) => setSearchMajor(e.target.value)}
             />
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control
             id="searchInterest"
             value={searchInterest}
             onChange={(e) => setSearchInterest(e.target.value)}
             />
            <br />
            <Button variant="neutral" onClick={handleResetSearch}>Reset Search</Button>
            <p>There are {shownStudents.length} student(s) matching your search.</p>
        </Form>
        <Container fluid>
            <Row>
                {
                    shownStudents.slice(24 * (activePage - 1), 24 * activePage).map(student =>
                        <Col key={student.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                        <Student name = {student.name} major = {student.major} numCredits = {student.numCredits} fromWisconsin = {student.fromWisconsin} interests = {student.interests}/>
                        </Col>
                    )
                }
            </Row>
        </Container>
        <Pagination>
            {buildPaginator()}
        </Pagination>
    </div>

}

export default Classroom;