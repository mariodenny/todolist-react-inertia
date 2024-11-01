<?php

namespace App\Trait;

trait JsonResponser
{
    private function jsonSuccessResponse($data = null, string $message = 'Request Success!', int $code = 200)
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'code' => $code,
            'data' => $data
        ], $code);
    }

    private function jsonErrorResponse(string $message = 'Request Failed!', int $code = 500, $data = null)
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'code' => $code,
            'data' => $data
        ], $code);
    }
}
