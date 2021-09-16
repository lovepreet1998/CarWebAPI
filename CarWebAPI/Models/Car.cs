using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarWebAPI.Models
{
    public class Car
    {
        public int Id { get; set; }

        public string ModelName { get; set; }

        public string CompanyName { get; set; }

        public string Features { get; set; }
    }
}
