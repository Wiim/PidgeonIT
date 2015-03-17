using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PidgeonIT_REST.Models
{
    public class Match
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public DateTime Date { get; set; }
        public Pidgeon Winner { get; set; }
    }
}