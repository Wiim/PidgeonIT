using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace PidgeonIT_REST.Models
{
    public class Pidgeon
    {
        public int pidgeonID { get; set; }
        [Required]
        public string Name { get; set; }


        public int ownerID { get; set; }
        public virtual Owner Owner { get; set; }

        public int matchID { get; set; }
        public virtual ICollection<Match> Match { get; set; } 
    }
}