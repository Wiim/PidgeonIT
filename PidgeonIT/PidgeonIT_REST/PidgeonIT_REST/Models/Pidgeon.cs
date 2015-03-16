using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PidgeonIT_REST.Models
{
    public class Pidgeon
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Owner Owner { get; set; }
        public int Wins { get; set; }
    }
}