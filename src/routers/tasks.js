const express = require("express");
const Tasks = require("../models/tasks");
const auth = require("../middleware/auth");
const Task = require("../models/tasks");
const router = new express.Router();

//updating resource
router.patch("/tasks/:id", auth, async (req, res) => {
  const id = req.params.id;
  const owner = req.user._id;
  const updateQuery = req.body;
  const updates = Object.keys(updateQuery);

  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Operation" });
  }

  try {
    const task = await Tasks.findOne({ _id: id, owner: owner });

    if (!task) {
      return res.status(404).send();
    }
    updates.forEach((update) => (task[update] = updateQuery[update]));
    await task.save();
    res.status(202).send(task);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.post("/tasks", auth, async (req, res) => {
  // const task = new Tasks(req.body);
  //save to db
  const task = new Tasks({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send();
  }
  // task
  //   .save()
  //   .then((resp) => {
  //     res.status(201).send(resp);
  //   })
  //   .catch((err) => {
  //     res.status(400).send(err);
  //   });
});

//deleting a task
router.delete("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOneAndDelete({ _id: _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Tasks.findOne({ _id: _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }

  // Tasks.findById(_id)
  //   .then((task) => {
  //     if (!task) {
  //       return res.status(404).send();
  //     }
  //     res.send(task);
  //   })
  //   .catch((err) => {
  //     res.status(500).send();
  //   });
});

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=0
// GET /tasks?sortBy=createdAt_asc
// or
// GET /tasks?sortBy=createdAt:desc
router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};
  if (req.query.completed) {
    //if there a value was provided , and equal to the 'true' string
    match.completed = req.query.completed === "true";
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1
  }
  try {
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        //it will be ignored if we did not find limit
        limit: parseInt(req.query.limit), //parse a string that contains a number into an integer
        skip: parseInt(req.query.skip),
        sort,
        // sort:{
        //   // createdAt:-1, //asc // desc:-1
        //   completed:-1 // desc :-1 = completed first // for incompleted tasks: 1

        // }
      },
    });
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }

  // Tasks.find({})
  //   .then((resp) => {
  //     res.send(resp);
  //   })
  //   .catch((err) => {
  //     res.status(500).send();
  //   });
});

module.exports = router;
