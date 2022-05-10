package com.ssafy.helpus.controller;

import com.ssafy.helpus.model.Member;
import com.ssafy.helpus.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private MemberService memberService;

    @PostMapping(value = "/user")
    public ResponseEntity join(@RequestBody Member member){
        member.setPassword(bCryptPasswordEncoder.encode(member.getPassword()));

        System.out.println(member);
        boolean success = memberService.joinUser(member);
        if(success)
            return new ResponseEntity(HttpStatus.OK);
        else
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }
    @PostMapping(value = "/org",consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity joinOrg(@RequestPart Member member, @RequestPart MultipartFile registration){
        member.setPassword(bCryptPasswordEncoder.encode(member.getPassword()));
        System.out.println(member);
        boolean result = memberService.joinOrg(member, registration);
        if(result)
            return new ResponseEntity(HttpStatus.OK);
        else
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }
//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody Member member){
////        member.setPassword(bCryptPasswordEncoder.encode(member.getPassword()));
//        String result = memberService.login(member);
//        if(!result.equals("error"))
//            return new ResponseEntity<String>("Bearer "+result,HttpStatus.OK);
//        else
//            return new ResponseEntity(HttpStatus.BAD_REQUEST);
//    }


    @PostMapping("/email-auth")
    public ResponseEntity<Map<String,String>> emailAuth(@RequestBody Map<String,String> param){
        String email = param.get("email");
        boolean isDuplicated = memberService.checkEmail(email);
        if(isDuplicated){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        String result = memberService.getEmailCode(email);
        System.out.println("email : "+email);
        if(result.equals("error")){
            Map<String,String> tmp = new HashMap<>();
            tmp.put("result","false");
            return new ResponseEntity(tmp,HttpStatus.BAD_REQUEST);
        }
        else{
            Map<String,String> tmp = new HashMap<>();
            tmp.put("code",result);
            tmp.put("result","true");
            return new ResponseEntity(tmp,HttpStatus.OK);
        }
    }

    @PostMapping("/phone-auth")
    public ResponseEntity<Map<String,String>> phoneAuth(@RequestBody Map<String,String> param){
        String phoneNumber = param.get("number");
        boolean isDuplicated = memberService.checkTel(phoneNumber);
        if(isDuplicated){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        String result = memberService.getPhoneCode(phoneNumber);
        System.out.println("phoneNumber : "+phoneNumber);
        if(result.equals("error")){
            Map<String,String> tmp = new HashMap<>();
            tmp.put("result","false");
            return new ResponseEntity(tmp,HttpStatus.BAD_REQUEST);
        }
        else{
            Map<String,String> tmp = new HashMap<>();
            tmp.put("code",result);
            tmp.put("result","true");
            return new ResponseEntity(tmp,HttpStatus.OK);
        }
    }

    @PostMapping("/email-check")
    public ResponseEntity<Boolean> emailCheck(@RequestBody Map<String,String> param){
        String email = param.get("email");
        boolean isDuplicated = memberService.checkEmail(email);
        return new ResponseEntity(!isDuplicated,HttpStatus.OK);
    }

    @PutMapping(value = "/update",consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Boolean> updateMember(@RequestPart Member member, @RequestPart MultipartFile profile,@RequestHeader HttpHeaders headers) throws IOException {
        int tokenMemberId = Integer.parseInt(headers.get("memberId").get(0));
        int memberId = member.getMemberId();
        if(tokenMemberId != memberId){
            return new ResponseEntity(false,HttpStatus.BAD_REQUEST);
        }
        String newInfo = member.getInfo();
        boolean result = memberService.updateMember(memberId,profile,newInfo);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }
    @PutMapping(value = "/update/admin",consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Boolean> updateMemberByAdmin(@RequestPart Member member, @RequestPart MultipartFile profile,@RequestHeader HttpHeaders headers) throws IOException {
        String role = headers.get("role").get(0);
        int memberId = member.getMemberId();
        if(!role.equals("ADMIN")){
            return new ResponseEntity(false,HttpStatus.BAD_REQUEST);
        }

        boolean result = memberService.updateMemberByAdmin(memberId,profile,member);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<Boolean> deleteMember(@RequestBody Member member, @RequestHeader HttpHeaders headers){
        String role = headers.get("role").get(0);
        if(role.equals("ADMIN")){
            return new ResponseEntity(memberService.deleteMember(member.getMemberId()),HttpStatus.OK);
        }
        else if(role.equals("USER") || role.equals("ORG")){
            Member tmp = memberService.getMemberById(member.getMemberId());
            int tokenMemberId = Integer.parseInt(headers.get("memberId").get(0));
            if(tokenMemberId == tmp.getMemberId())
                return new ResponseEntity(memberService.deleteMember(tokenMemberId),HttpStatus.OK);
        }
        return new ResponseEntity(false,HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/admin/{page_num}")
    public ResponseEntity<List<Map<String,Object>>> getAllMemberByAdmin(@RequestHeader HttpHeaders headers, @PathVariable("page_num") int pageNum) {
        String role = headers.get("role").get(0);
        if (!role.equals("ADMIN"))
            return new ResponseEntity(HttpStatus.BAD_REQUEST);

        List<Map<String, Object>> result = new ArrayList<>();

        Map<String,Object> cnt = new HashMap<>();
        int totalCount = memberService.getCount();
        cnt.put("total_page",totalCount);
        result.add(cnt);

        Map<String,Object> member = new HashMap<>();
        List<Member> members = memberService.getAllMembers();
        int from = 10*(pageNum-1);
        int to = Math.min(from+10,totalCount);
        List<Member> resultMembers = members.subList(from,to);
        member.put("members",resultMembers);
        result.add(member);

        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @GetMapping("/waiting-list/{page_num}")
    public ResponseEntity<List<Map<String,Object>>> getWaitMemberByAdmin(@RequestHeader HttpHeaders headers, @PathVariable("page_num") int pageNum) {
        String role = headers.get("role").get(0);
        if (!role.equals("ADMIN"))
            return new ResponseEntity(HttpStatus.BAD_REQUEST);

        List<Map<String, Object>> result = new ArrayList<>();

        Map<String,Object> cnt = new HashMap<>();
        int totalCount = memberService.getWaitCount();
        cnt.put("total_page",totalCount);
        result.add(cnt);

        Map<String,Object> member = new HashMap<>();
        List<Member> members = memberService.getWaitMembers();
        int from = 10*(pageNum-1);
        int to = Math.min(from+10,totalCount);
        List<Member> resultMembers = members.subList(from,to);
        member.put("members",resultMembers);
        result.add(member);

        return new ResponseEntity<>(result,HttpStatus.OK);
    }
    @GetMapping("/waiting-detail/{member_id}")
    public ResponseEntity<Member> getWaitMemberDetailByAdmin(@RequestHeader HttpHeaders headers, @PathVariable("member_id") int memberId) {
        String role = headers.get("role").get(0);
        if (!role.equals("ADMIN"))
            return new ResponseEntity(HttpStatus.BAD_REQUEST);

        Member result = memberService.getMemberById(memberId);
        if(result == null)
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        else
            return new ResponseEntity(result,HttpStatus.OK);
    }
    @PutMapping("/permission")
    public ResponseEntity<Boolean> updateMemberPermission(@RequestHeader HttpHeaders headers,@RequestBody Map<String,Object> param){
        String role = headers.get("role").get(0);
        if (!role.equals("ADMIN"))
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        int memberId = (int) param.get("member_id");
        boolean permission = (boolean) param.get("permission");
        if(permission){
            boolean result = memberService.updateMemberPermission(memberId);
            return new ResponseEntity<>(result,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PutMapping("/warning")
    public ResponseEntity<Boolean> updateMemberWarning(@RequestHeader HttpHeaders headers, @RequestBody Member member){
        String role = headers.get("role").get(0);
        if (!role.equals("ADMIN"))
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        int memberId = member.getMemberId();
        boolean result = memberService.updateMemberWarning(memberId);

        return new ResponseEntity<>(result,HttpStatus.OK);
    }
    @GetMapping("/{member_id}")
    public ResponseEntity<Member> getOneMember(@PathVariable("member_id") int memberId){

        Member result = memberService.getMemberById(memberId);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }
}
