using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PidgeonIT_REST.Controllers
{
    public class MatchController : ApiController
    {
        public IHttpActionResult Get()
        {
            return Json(Database.getMatches());
        }

        public IHttpActionResult Get(int id)
        {
            return Json(Database.getMatch(id));
        }

        public IHttpActionResult Delete(int matchId, int pidgeonId)
        {
            bool success = Database.removePidgeonFromMatch(matchId, pidgeonId);
            if (success)
            {
                return Ok();
            }
            return NotFound();
        }
    }
}
