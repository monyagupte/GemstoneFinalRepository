﻿using System;
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
    public class perItemDetailsController : ApiController
    {
        private GemStone_LIVEEntities6 db = new GemStone_LIVEEntities6();

        // GET: api/perItemDetails
        public IQueryable<perItemDetail> GetperItemDetails()
        {
            return db.perItemDetails;
        }

        // GET: api/perItemDetails/5
        [ResponseType(typeof(perItemDetail))]
        public IHttpActionResult GetperItemDetail(int id)
        {
            perItemDetail perItemDetail = db.perItemDetails.Find(id);
            if (perItemDetail == null)
            {
                return NotFound();
            }

            return Ok(perItemDetail);
        }

        // PUT: api/perItemDetails/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutperItemDetail(int id, perItemDetail perItemDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != perItemDetail.id)
            {
                return BadRequest();
            }

            db.Entry(perItemDetail).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!perItemDetailExists(id))
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

        // POST: api/perItemDetails
        [ResponseType(typeof(perItemDetail))]
        public IHttpActionResult PostperItemDetail(perItemDetail perItemDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.perItemDetails.Add(perItemDetail);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = perItemDetail.id }, perItemDetail);
        }

        // DELETE: api/perItemDetails/5
        [ResponseType(typeof(perItemDetail))]
        public IHttpActionResult DeleteperItemDetail(int id)
        {
            perItemDetail perItemDetail = db.perItemDetails.Find(id);
            if (perItemDetail == null)
            {
                return NotFound();
            }

            db.perItemDetails.Remove(perItemDetail);
            db.SaveChanges();

            return Ok(perItemDetail);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool perItemDetailExists(int id)
        {
            return db.perItemDetails.Count(e => e.id == id) > 0;
        }
    }
}