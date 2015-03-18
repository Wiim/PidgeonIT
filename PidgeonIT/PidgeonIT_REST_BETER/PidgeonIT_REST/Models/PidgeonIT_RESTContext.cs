using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace PidgeonIT_REST.Models
{
    public class PidgeonIT_RESTContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public PidgeonIT_RESTContext() : base("name=PidgeonIT_RESTContext")
        {
        }

        public System.Data.Entity.DbSet<PidgeonIT_REST.Models.Pidgeon> Pidgeons { get; set; }

        public System.Data.Entity.DbSet<PidgeonIT_REST.Models.Owner> Owners { get; set; }

        public System.Data.Entity.DbSet<PidgeonIT_REST.Models.Match> Matches { get; set; }
    
    }
}
