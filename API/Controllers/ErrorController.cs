using API.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{  
    [Route("errors/{code}")]
    //Makes this controller to be ignored by Swagger
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ErrorController: BaseApiController
    {        
        public IActionResult Error(int code)
        {
            return new ObjectResult(new ApiResponse(code));
        }
    }
}