/**
 * skill controller
 */

import { factories } from "@strapi/strapi";

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}

export default factories.createCoreController("api::skill.skill", ({ strapi }) => ({
  async randomSkills(ctx) {
    try {
      // 1. Fetch all skills
      const allSkills = await strapi.db.query("api::skill.skill").findMany({
        select: ["id", "name"],
      });

      if (!allSkills || allSkills.length === 0) {
        ctx.body = [];
        return;
      }

      // 2. Remove duplicates by name
      const uniqueByName = Array.from(new Map(allSkills.map((skill) => [skill.name?.toLowerCase(), skill])).values());

      // 3. Shuffle using Fisher–Yates algorithm
      for (let i = uniqueByName.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [uniqueByName[i], uniqueByName[j]] = [uniqueByName[j], uniqueByName[i]];
      }

      // 4. Select up to 3 unique names
      const randomThree = uniqueByName.slice(0, 3);

      ctx.body = randomThree;
    } catch (error) {
      strapi.log.error("Error fetching random skills:", error);
      ctx.throw(500, "Failed to fetch random skills");
    }
  },
}));
