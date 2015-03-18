namespace PidgeonIT_REST.Migrations
{
    using PidgeonIT_REST.Models;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<PidgeonIT_REST.Models.PidgeonIT_RESTContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(PidgeonIT_REST.Models.PidgeonIT_RESTContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            context.Pidgeons.AddOrUpdate(p => p.pidgeonID,
                new Pidgeon { Name = "Gadreel" , ownerID = 1 , matchID = 3, Match = new List<Match>() },
                new Pidgeon { Name = "Castiel", ownerID = 2, matchID = 4, Match = new List<Match>() },
                new Pidgeon { Name = "Abbadon", ownerID = 2, matchID = 4, Match = new List<Match>() },
                new Pidgeon { Name = "Asriel", ownerID = 3, matchID = 2, Match = new List<Match>() }
                );
            context.Owners.AddOrUpdate(o => o.ownerID,
                new Owner {  Name = "sam"},
                new Owner {  Name = "Crowley"},
                new Owner {  Name = "Dean"}
            );

            context.Matches.AddOrUpdate(m => m.matchID,
                new Match { Name = "pidgey500", Location = "indianapolis", date = new DateTime(2015,9,17,18,30,0), Pidgeons = new List<Pidgeon>()},
                new Match { Name = "Yellowwing", Location = "dorothy", date = new DateTime(2015, 7, 6, 14, 45, 00), Pidgeons = new List<Pidgeon>() },
                new Match { Name = "Redwing", Location = "EURPSS", date = new DateTime(2015, 7, 23, 15, 00, 00), Pidgeons = new List<Pidgeon>() }
            );
            

        }
    }
}
