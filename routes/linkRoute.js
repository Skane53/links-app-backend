const express = require("express");
const router = express.Router();
const Link = require("../models/linkModel");

router.route("/create").post((req, res) => {
  const url = req.body.url;
  const courseTitle = req.body.courseTitle;
  const courseNumber = req.body.courseNumber;
  const newLink = new Link({
    url,
    courseTitle,
    courseNumber,
  });

  if (url == "" || courseTitle == "" || courseNumber == "") {
  } else {
    newLink.save();
  }
});

router.route("/delete").post((req, res) => {
  const url = req.body.url;
  const linkToDelete = new Link({
    url,
  });

  if (url == "") {
  } else {
    //newLink.save();
    Link.deleteOne({ url: linkToDelete.url }).then((foundLinks) =>
      res.json(foundLinks)
    );
  }
});

router.route("/links").post((req, res) => {
  Link.aggregate([
    {
      $search: {
        text: {
          query: req.body.query,
          path: "courseTitle",
        },
      },
    },
    {
      $project: {
        _id: 0,
        courseTitle: 1,
      },
    },
    {
      $limit: 3,
    },
  ]).then((foundCourses) => {
    console.log(foundCourses);
    //res.json(foundCourses);
  });
});

router.route("/links").get((req, res) => {
  Link.find().then((foundLinks) => res.json(foundLinks));
});

router.route("/links/:title").get((req, res) => {
  //console.log(req.params.title);
  Link.find({ courseTitle: req.params.title }).then((foundLinks) =>
    res.json(foundLinks)
  );
});

module.exports = router;
