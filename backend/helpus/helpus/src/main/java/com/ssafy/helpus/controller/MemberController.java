package com.ssafy.helpus.controller;

import com.ssafy.helpus.model.Member;
import com.ssafy.helpus.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
public class MemberController {

//    @Autowired
//    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private MemberService memberService;

    @PostMapping("/user")
    public ResponseEntity join(@RequestBody Member member){
//        member.setPassword(bCryptPasswordEncoder.encode(member.getPassword()));
        member.setRole("USER");
        System.out.println(member);
        boolean success = memberService.join(member);
        if(success)
            return new ResponseEntity(HttpStatus.OK);
        else
            return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Member member){
//        member.setPassword(bCryptPasswordEncoder.encode(member.getPassword()));
        String result = memberService.login(member);
        if(!result.equals("error"))
            return new ResponseEntity<String>("Bearer "+result,HttpStatus.OK);
        else
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/update")
    public ResponseEntity<Member> updateByMember(@RequestBody Member member, @RequestHeader HttpHeaders headers){
        member.setMemberId(Integer.parseInt(headers.get("memberId").get(0)));
        return new ResponseEntity<Member>(member,HttpStatus.OK);
    }

}
