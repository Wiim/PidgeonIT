using System;
using System.Collections.Generic;
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
    }
}
