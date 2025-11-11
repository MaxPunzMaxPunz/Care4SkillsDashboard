/**
 * click controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::click.click", ({ strapi }) => ({
  async findAll(ctx) {
    try {
      // Fetch all clicks and populate relations (skill + job_title)
      const clicks = await strapi.db.query("api::click.click").findMany({
        populate: {
          skill: true,
          job_title: true,
        },
        orderBy: { createdAt: "desc" }, // optional
      });

      ctx.body = clicks;
    } catch (error) {
      strapi.log.error("Error fetching clicks:", error);
      ctx.throw(500, "Failed to fetch clicks");
    }
  },
  async saveClick(ctx) {
    try {
      const { skillId, jobTitle } = ctx.request.body;

      if (!skillId) {
        return ctx.badRequest("Missing skillId");
      }

      // 1️⃣ Validate skill exists
      const skill = await strapi.db.query("api::skill.skill").findOne({
        where: { id: skillId },
      });
      if (!skill) return ctx.notFound("Skill not found");

      let job = null;

      // 2️⃣ Find or create job title
      if (jobTitle && jobTitle.trim()) {
        const trimmedTitle = jobTitle.trim();

        job = await strapi.db.query("api::job-title.job-title").findOne({
          where: { name: { $eqi: trimmedTitle } },
        });

        if (!job) {
          job = await strapi.db.query("api::job-title.job-title").create({
            data: { name: trimmedTitle },
          });
        }
      }

      // 3️⃣ Create click entry and link both relations by ID
      const click = await strapi.db.query("api::click.click").create({
        data: {
          skill: skillId, // ✅ matches schema "skill"
          job_title: job ? job.id : null, // ✅ matches schema "job_title"
        },
      });

      ctx.body = {
        success: true,
        clickId: click.id,
        jobId: job ? job.id : null,
      };
    } catch (error) {
      strapi.log.error("Error saving click:", error);
      ctx.throw(500, "Failed to save click");
    }
  },
}));
