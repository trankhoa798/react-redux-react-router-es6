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

  useEffect(() => {
    props.actions.loadCourses().catch((error) => {
      alert("Loading courses failed" + error);
    });
    props.actions.loadAuthors().catch((error) => {
      alert("Loading authors failed" + error);
    });
  }, []);

  const handleChange = (event) => {
    const course = { ...state.course, title: event.target.value };
    setState({ course });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.actions.createCourse(state.course);
  };

  return (
    <>
      <h2>Courses</h2>
      <CourseList courses={props.courses} authors={props.authors} />
    </>
  );
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    courses: state.courses,
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
