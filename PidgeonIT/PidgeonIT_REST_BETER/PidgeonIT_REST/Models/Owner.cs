using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PidgeonIT_REST.Models
{
    public class Owner
    {
        
        public int ownerID { get; set; }
        [Required]
        public string Name { get; set; }
    }
}