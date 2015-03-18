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
    public class PidgeonsController : ApiController
    {
        private PidgeonIT_RESTContext db = new PidgeonIT_RESTContext();

        // GET: api/Pidgeons
        //public IQueryable<Pidgeon> GetPidgeons()
        public IHttpActionResult GetPidgeons()
        {
            return Json(db.Pidgeons);
        }

        // GET: api/Pidgeons/5
        [ResponseType(typeof(Pidgeon))]
        public IHttpActionResult GetPidgeon(int id)
        {
            Pidgeon pidgeon = db.Pidgeons.Find(id);
            if (pidgeon == null)
            {
                return NotFound();
            }

            return Ok(pidgeon);
        }

        // PUT: api/Pidgeons/5
        //[ResponseType(typeof(void))]
        public IHttpActionResult PutPidgeon(Pidgeon pidgeon)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //if (id != pidgeon.pidgeonID)
            //{
            //    return BadRequest();
            //}

            db.Entry(pidgeon).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
                
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PidgeonExists(pidgeon.pidgeonID))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Json(db.Pidgeons);
            //return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Pidgeons
        [ResponseType(typeof(Pidgeon))]
        public IHttpActionResult PostPidgeon(Pidgeon pidgeon)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Debug.WriteLine(pidgeon.ToString());
            db.Pidgeons.Add(pidgeon);
            db.SaveChanges();

           // return CreatedAtRoute("DefaultApi", new { id = pidgeon.pidgeonID }, pidgeon);
            return Json(db.Pidgeons);
        }

        // DELETE: api/Pidgeons/5
        [ResponseType(typeof(Pidgeon))]
        public IHttpActionResult DeletePidgeon(int id)
        {
            Pidgeon pidgeon = db.Pidgeons.Find(id);
            if (pidgeon == null)
            {
                return NotFound();
            }

            db.Pidgeons.Remove(pidgeon);
            db.SaveChanges();

            return Ok(pidgeon);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PidgeonExists(int id)
        {
            return db.Pidgeons.Count(e => e.pidgeonID == id) > 0;
        }
    }
}