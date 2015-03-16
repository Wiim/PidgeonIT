using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using PidgeonIT_REST.Models;
using System.Diagnostics;

namespace PidgeonIT_REST.Controllers
{
    public class PidgeonController : ApiController
    {
        public IHttpActionResult Get()
        {
            return Json(Database.pidgeons);
        }

        public IHttpActionResult Get(int id)
        {
            var pidgeon = Database.getPidgeon(id);
                
            if (pidgeon == null)
            {
                return NotFound();
            }
            return Json(pidgeon);
        }

        public IHttpActionResult Delete(int id)
        {
           // int index = Database.pidgeons.FindIndex((p) => p.Id == id);
           
            bool found = Database.deletePidgeon(id);
            if (!found)
            {
                return NotFound();
            }
            //Database.pidgeons.RemoveAt(index);
            return Ok();
        }

        public IHttpActionResult Post(Pidgeon pidgeon)
        {
            Database.addPidgeon(pidgeon);
            return Json(Database.getPidgeons());
        }

        public IHttpActionResult Put(Pidgeon pidgeon)
        {
            Database.editPidgeon(pidgeon);
            return Json(Database.getPidgeons());
        }
    }
}
