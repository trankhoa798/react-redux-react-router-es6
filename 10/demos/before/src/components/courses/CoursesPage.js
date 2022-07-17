import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { CourseList } from "./CourseList";

function CoursesPage(props) {
  const [state, setState] = useState({
    course: {
      title: "",
    },
  });

  const { actions, courses } = props;
  useEffect(() => {
    actions.loadAuthors().catch((error) => {
      alert("Loading authors failed" + error);
    });
    actions.loadCourses().catch((error) => {
      alert("Loading courses failed" + error);
    });
  }, []);

  const handleChange = (event) => {
    const course = { ...state.course, title: event.target.value };
    setState({ course });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    actions.createCourse(state.course);
  };

  return (
    <>
      <h2>Courses</h2>
      <CourseList courses={courses} />
    </>
  );
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    courses: state.authors.length
      ? state.courses.map((course) => {
          return {
            ...course,
            authorName: state.authors.find(
              (author) => author.id === course.authorId
            ).name,
          };
        })
      : [],
    authors: state.authors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
