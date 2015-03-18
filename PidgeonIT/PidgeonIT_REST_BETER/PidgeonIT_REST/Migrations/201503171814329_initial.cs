namespace PidgeonIT_REST.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Matches", "pidgeonId", "dbo.Pidgeons");
            DropIndex("dbo.Matches", new[] { "pidgeonId" });
            DropIndex("dbo.Pidgeons", new[] { "ownerId" });
            CreateTable(
                "dbo.PidgeonMatches",
                c => new
                    {
                        Pidgeon_pidgeonID = c.Int(nullable: false),
                        Match_matchID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Pidgeon_pidgeonID, t.Match_matchID })
                .ForeignKey("dbo.Pidgeons", t => t.Pidgeon_pidgeonID, cascadeDelete: true)
                .ForeignKey("dbo.Matches", t => t.Match_matchID, cascadeDelete: true)
                .Index(t => t.Pidgeon_pidgeonID)
                .Index(t => t.Match_matchID);
            
            AddColumn("dbo.Pidgeons", "matchID", c => c.Int(nullable: false));
            AlterColumn("dbo.Matches", "pidgeonID", c => c.Int());
            CreateIndex("dbo.Pidgeons", "ownerID");
            DropColumn("dbo.Pidgeons", "Wins");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Pidgeons", "Wins", c => c.Int(nullable: false));
            DropForeignKey("dbo.PidgeonMatches", "Match_matchID", "dbo.Matches");
            DropForeignKey("dbo.PidgeonMatches", "Pidgeon_pidgeonID", "dbo.Pidgeons");
            DropIndex("dbo.PidgeonMatches", new[] { "Match_matchID" });
            DropIndex("dbo.PidgeonMatches", new[] { "Pidgeon_pidgeonID" });
            DropIndex("dbo.Pidgeons", new[] { "ownerID" });
            AlterColumn("dbo.Matches", "pidgeonID", c => c.Int(nullable: false));
            DropColumn("dbo.Pidgeons", "matchID");
            DropTable("dbo.PidgeonMatches");
            CreateIndex("dbo.Pidgeons", "ownerId");
            CreateIndex("dbo.Matches", "pidgeonId");
            AddForeignKey("dbo.Matches", "pidgeonId", "dbo.Pidgeons", "pidgeonId", cascadeDelete: true);
        }
    }
}
