using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using PidgeonIT_REST.Models;
using System.Diagnostics;

namespace PidgeonIT_REST.Controllers
{
    public class MatchesController : ApiController
    {
        private PidgeonIT_RESTContext db = new PidgeonIT_RESTContext();

        // GET: api/Matches
        public IQueryable<Match> GetMatches()
        {
            return db.Matches;
        }

        // GET: api/Matches/5
        [ResponseType(typeof(Match))]
        public IHttpActionResult GetMatch(int id)
        {
            Match match = db.Matches.Find(id);
            if (match == null)
            {
                return NotFound();
            }

            return Ok(match);
        }

        // PUT: api/Matches/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMatch(int id, Match match)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != match.matchID)
            {
                return BadRequest();
            }

            db.Entry(match).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MatchExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Matches
        [ResponseType(typeof(Match))]
        public IHttpActionResult PostMatch(Match match)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Matches.Add(match);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = match.matchID }, match);
        }

        // DELETE: api/Matches/5
        [ResponseType(typeof(Match))]
        public IHttpActionResult DeleteMatch(int id)
        {
            Match match = db.Matches.Find(id);
            if (match == null)
            {
                return NotFound();
            }

            db.Matches.Remove(match);
            db.SaveChanges();

            return Ok(match);
        }

        [HttpPost]
        public IHttpActionResult AddPidgeonToMatch(int matchId, int pidgeonId)
        {

            Match match = db.Matches.Find(matchId);
            if (match == null)
            {
                return NotFound();
            }

            match.Pidgeons.Add(db.Pidgeons.Find(pidgeonId));

            db.SaveChanges();

            return Json(match);
            //bool success = Database.removePidgeonFromMatch(matchId, pidgeonId);
            //if (success)
            //{
            //    return Ok();
            //}
            //return NotFound();
        }

        [HttpDelete]
        public IHttpActionResult DeletePidgeonFromMatch(int matchId, int pidgeonId)
        {
            return Ok();
            //bool success = Database.removePidgeonFromMatch(matchId, pidgeonId);
            //if (success)
            //{
            //    return Ok();
            //}
            //return NotFound();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MatchExists(int id)
        {
            return db.Matches.Count(e => e.matchID == id) > 0;
        }
    }
}