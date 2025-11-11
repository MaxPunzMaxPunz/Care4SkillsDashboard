export default {
  routes: [
    {
      method: "GET",
      path: "/skills/random",
      handler: "skill.randomSkills",
      config: {
        auth: false,
      },
    },
  ],
};
