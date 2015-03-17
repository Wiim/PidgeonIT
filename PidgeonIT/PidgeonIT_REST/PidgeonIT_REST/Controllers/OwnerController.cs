using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PidgeonIT_REST.Controllers
{
    public class OwnerController : ApiController
    {
        public IHttpActionResult Get()
        {
            return Json(Database.getOwners());
        }
    }
}
