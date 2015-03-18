using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace PidgeonIT_REST.Models
{
    public class Match
    {
        public int matchID { get; set; }
        [Required]
        public String Name { get; set; }
        public DateTime date { get; set; }
        public String Location { get; set; }


        public int? pidgeonID { get; set; }
        public virtual ICollection<Pidgeon> Pidgeons { get; set; } 
    }
}