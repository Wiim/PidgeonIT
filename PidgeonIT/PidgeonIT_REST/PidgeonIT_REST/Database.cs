using PidgeonIT_REST.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PidgeonIT_REST
{
    public static class Database
    {
        public static List<Pidgeon> pidgeons = new List<Pidgeon>
        {
            new Pidgeon(){Id = 1, Name = "Piet", Wins = 3, Owner = new Owner(){Id = 1, Name = "George"}},
            new Pidgeon(){Id = 2, Name = "Klaas", Wins = 0, Owner = new Owner(){Id = 2, Name = "George"}},
            new Pidgeon(){Id = 3, Name = "Jan", Wins = 1, Owner = new Owner(){Id = 3, Name = "George"}},
            new Pidgeon(){Id = 4, Name = "Kees", Wins = 2, Owner = new Owner(){Id = 4, Name = "Herman"}},
            new Pidgeon(){Id = 5, Name = "Bert", Wins = 5, Owner = new Owner(){Id = 5, Name = "Obama"}},
            new Pidgeon(){Id = 6, Name = "Peter", Wins = 0, Owner = new Owner(){Id = 6, Name = "Beatrix"}},
        };

        public static List<Match> matches = new List<Match>
        {
            new Match(){Id = 1, Name = "Tour de France", Location = "Antarctica", Date = new DateTime(2012, 12, 12), Winner = null},
            new Match(){Id = 2, Name = "Tour de France", Location = "Antarctica", Date = new DateTime(2013, 12, 12), Winner = null},
            new Match(){Id = 3, Name = "Tour de France", Location = "Antarctica", Date = new DateTime(2014, 12, 12), Winner = null},
            new Match(){Id = 4, Name = "Tour de France", Location = "Antarctica", Date = new DateTime(2015, 12, 12), Winner = null},
            new Match(){Id = 5, Name = "Tour de France", Location = "Antarctica", Date = new DateTime(2016, 12, 12), Winner = null},
            new Match(){Id = 6, Name = "Tour de France", Location = "Antarctica", Date = new DateTime(2017, 12, 12), Winner = null}
        };

        public static List<Match> getMatches()
        {
            return matches;
        }

        public static Match getMatch(int id)
        {
            return matches.FirstOrDefault((p) => p.Id == id);
        }

        public static Pidgeon getPidgeon(int id)
        {
            return pidgeons.FirstOrDefault((p) => p.Id == id);
        }

        public static bool deletePidgeon(int id)
        {
            int index = pidgeons.FindIndex((p) => p.Id == id);
            if (index == null)
            {
                return false;
            }
            pidgeons.RemoveAt(index);
            return true;
        }

        public static bool addPidgeon(Pidgeon pidgeon)
        {
            pidgeons.Add(pidgeon);
            return true;
        }

        public static List<Pidgeon> getPidgeons()
        {
            return pidgeons;
        }

        public static bool editPidgeon(Pidgeon pidgeon)
        {
            int index = pidgeons.FindIndex((p) => p.Id == pidgeon.Id);
            if (index == -1)
            {
                return false;
            }
            pidgeons[index] = pidgeon;
            //pidgeons.Insert(index, pidgeon);
            return true;
        }
    }
}