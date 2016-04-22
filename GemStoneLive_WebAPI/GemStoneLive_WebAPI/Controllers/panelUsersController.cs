using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using GemStoneLive_WebAPI;

namespace GemStoneLive_WebAPI.Controllers
{
    public class panelUsersController : ApiController
    {
        private GemStone_LIVEEntities8 db = new GemStone_LIVEEntities8();

        // GET: api/panelUsers
        public IQueryable<panelUser> GetpanelUsers()
        {
            return db.panelUsers;
        }

        // GET: api/panelUsers
        public IQueryable<panelUser> GetpanelUsers(string username, string password)
        {
            return db.panelUsers.Where(e => e.userName == username && e.passWord == password); ;
        }

        // GET: api/panelUsers
        public IQueryable<panelUser> GetpanelUsers(string username)
        {
            return db.panelUsers.Where(e => e.userName == username); ;
        }

        // GET: api/panelUsers/5
        [ResponseType(typeof(panelUser))]
        public IHttpActionResult GetpanelUser(int id)
        {
            panelUser panelUser = db.panelUsers.Find(id);
            if (panelUser == null)
            {
                return NotFound();
            }

            return Ok(panelUser);
        }

        // PUT: api/panelUsers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutpanelUser(int id, panelUser panelUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != panelUser.id)
            {
                return BadRequest();
            }

            db.Entry(panelUser).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!panelUserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/panelUsers
        [ResponseType(typeof(panelUser))]
        public IHttpActionResult PostpanelUser(panelUser panelUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.panelUsers.Add(panelUser);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = panelUser.id }, panelUser);
        }

        // DELETE: api/panelUsers/5
        [ResponseType(typeof(panelUser))]
        public IHttpActionResult DeletepanelUser(int id)
        {
            panelUser panelUser = db.panelUsers.Find(id);
            if (panelUser == null)
            {
                return NotFound();
            }

            db.panelUsers.Remove(panelUser);
            db.SaveChanges();

            return Ok(panelUser);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool panelUserExists(int id)
        {
            return db.panelUsers.Count(e => e.id == id) > 0;
        }
    }
}       