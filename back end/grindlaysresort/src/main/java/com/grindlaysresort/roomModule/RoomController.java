package com.grindlaysresort.roomModule;

import com.grindlaysresort.exception.ObjectNotFoundException;
import com.grindlaysresort.roomModule.bedtype.BedType;
import com.grindlaysresort.roomModule.feature.Features;
import com.grindlaysresort.roomModule.roomstates.RoomStates;
import com.grindlaysresort.roomModule.roomstates.RoomStatesDao;
import com.grindlaysresort.roomModule.roomtype.RoomType;
import com.grindlaysresort.roomModule.viewtype.ViewType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/room")
public class RoomController {
    @Autowired
    RoomDao roomDao;

    @Autowired
    RoomHasBedTypeDao roomHasBedTypeDao;
    @Autowired
    private RoomStatesDao roomStatesDao;

    @GetMapping("/detailsbedcount")
    public  List<RoomHasBedType> name(@RequestParam("bed_type_id") int bedTypeId, @RequestParam("room_id") int roomId) {
        return roomHasBedTypeDao.findRoomCountByBedTypeAndRoomId(bedTypeId,roomId);
    }

    @GetMapping("/roomdetails")
    public Optional<Room> roomDetail(@RequestParam("room_id") int roomId) {
        Optional<Room> room = roomDao.findById(roomId);
        if (room.isEmpty()) {
            HashMap<String, String> errorSet = new HashMap<>();
            errorSet.put("room", "Room is not found");
            throw new ObjectNotFoundException(errorSet);
        }
        return Optional.of(room.get());
    }

    @GetMapping("/detailsbedcountinroom")
    public  List<RoomHasBedType> name(@RequestParam("room_id") int roomId) {
        return roomHasBedTypeDao.findRoomCountByRoomId(roomId);
    }

    @GetMapping()
    public List<Room> getAllRoom(){
        return roomDao.findAll();
    }

    @PostMapping
    public void getRoomByType(@RequestBody HashMap<String, Object> roomAllDetail){

        Room room = new Room();

        // Set Room Number
        room.setNumber(roomDao.nextRoomNumber());

        // Set the Room Head Count
        room.setMaxheadcount((Integer) roomAllDetail.get("maxheadcount"));

        // Set the Features List
        List<HashMap<String,Object>> roomFeatures = (List<HashMap<String, Object>>) roomAllDetail.get("featuresList");
        List<Features> featuresList = new ArrayList<>();
        for (HashMap<String, Object> roomFeature : roomFeatures) {
            Features features = new Features();
            features.setId((Integer) roomFeature.get("id"));
            features.setFeature((String) roomFeature.get("feature"));
            featuresList.add(features);
        }
        room.setFeaturesList(featuresList);

        //Set Room Type
        HashMap<String, Object> roomTypeDetail = (HashMap<String, Object>) roomAllDetail.get("roomtype_id");
        RoomType roomType = new RoomType();
        roomType.setId((Integer) roomTypeDetail.get("id"));
        roomType.setName((String) roomTypeDetail.get("name"));
        room.setRoomtype_id(roomType);

        //set Room Name
        room.setRoomname((String) roomAllDetail.get("roomname"));

        //Set Room Price
        Object priceObject = roomAllDetail.get("roomprice");
        if (priceObject instanceof Integer) {room.setRoomprice(BigDecimal.valueOf((Integer) priceObject));}
        else if (priceObject instanceof Double) {room.setRoomprice(BigDecimal.valueOf((Double) priceObject));}
        else if (priceObject instanceof BigDecimal) {room.setRoomprice((BigDecimal) priceObject);}
        else {throw new IllegalArgumentException("Invalid price format");}


        // Set ViewType
        HashMap<String, Object> viewTypeDetail = (HashMap<String, Object>) roomAllDetail.get("viewtype_id");
        ViewType viewType = new ViewType();
        viewType.setId((Integer) viewTypeDetail.get("id"));
        viewType.setType((String) viewTypeDetail.get("type"));
        room.setViewtype_id(viewType);

        //Room Status Id
        HashMap<String, Object> roomStatusDetail = (HashMap<String, Object>) roomAllDetail.get("roomstates_id");
          RoomStates roomStates = new RoomStates();
        roomStates.setId((Integer) roomStatusDetail.get("id"));
        roomStates.setStatus((String) roomStatusDetail.get("status"));
        room.setRoomstates_id(roomStates);

        // Loop through the bedTypesList
        List<BedType> bedTypes = new ArrayList<>();
        List<HashMap<String, Object>> bedTypesList = (List<HashMap<String, Object>>) roomAllDetail.get("bedTypes");
        List<RoomHasBedType> roomHasBedTypes = new ArrayList<>();
        for (HashMap<String, Object> bedTypeMap : bedTypesList) {
            RoomHasBedType roomHasBedType = new RoomHasBedType();

            // Set BedType
            HashMap<String, Object> bedTypeDetail = (HashMap<String, Object>) bedTypeMap.get("bedType");
            BedType bedType = new BedType();
            bedType.setId((Integer) bedTypeDetail.get("id"));
            bedType.setType((String) bedTypeDetail.get("type"));
            roomHasBedType.setBedType(bedType);

            bedTypes.add(bedType);

            // Set Bed Count
            roomHasBedType.setBed_count(Integer.parseInt((String) bedTypeMap.get("bed_count")));

            // add to list
            roomHasBedTypes.add(roomHasBedType);
        }
        room.setBedTypes(bedTypes);
        Room savedRoom = roomDao.save(room);

        for (RoomHasBedType bedType : roomHasBedTypes) {

            System.out.println("Room id "+savedRoom.getId());
            System.out.println("Bed id "+bedType.getBedType().getId());
            System.out.println("Bed count "+bedType.getBed_count());
            roomDao.setRoomBedCount(bedType.getBed_count(),savedRoom.getId(),bedType.getBedType().getId());
        }
    }

    @PutMapping
    public void updateRoom(@RequestBody HashMap<String, Object> roomAllDetail, @RequestParam("room_id") int roomId){

        Room room = new Room();

        room.setId(roomId);

        // Set Room Number
        room.setNumber(roomDao.findById(roomId).get().getNumber());

        // Set the Room Head Count
        room.setMaxheadcount((Integer) roomAllDetail.get("maxheadcount"));

        // Set the Features List
        List<HashMap<String, Object>> roomFeatures = (List<HashMap<String, Object>>) roomAllDetail.get("featuresList");
        List<Features> featuresList = new ArrayList<>();
        for (HashMap<String, Object> roomFeature : roomFeatures) {
            Features features = new Features();
            features.setId((Integer) roomFeature.get("id"));
            features.setFeature((String) roomFeature.get("feature"));
            featuresList.add(features);
        }
        room.setFeaturesList(featuresList);

        //Set Room Type
        HashMap<String, Object> roomTypeDetail = (HashMap<String, Object>) roomAllDetail.get("roomtype_id");
        RoomType roomType = new RoomType();
        roomType.setId((Integer) roomTypeDetail.get("id"));
        roomType.setName((String) roomTypeDetail.get("name"));
        room.setRoomtype_id(roomType);

        //set Room Name
        room.setRoomname((String) roomAllDetail.get("roomname"));

        //Set Room Price
        Object priceObject = roomAllDetail.get("roomprice");
        if (priceObject instanceof Integer) {room.setRoomprice(BigDecimal.valueOf((Integer) priceObject));}
        else if (priceObject instanceof Double) {room.setRoomprice(BigDecimal.valueOf((Double) priceObject));}
        else if (priceObject instanceof BigDecimal) {room.setRoomprice((BigDecimal) priceObject);}
        else {throw new IllegalArgumentException("Invalid price format");}


        // Set ViewType
        HashMap<String, Object> viewTypeDetail = (HashMap<String, Object>) roomAllDetail.get("viewtype_id");
        ViewType viewType = new ViewType();
        viewType.setId((Integer) viewTypeDetail.get("id"));
        viewType.setType((String) viewTypeDetail.get("type"));
        room.setViewtype_id(viewType);

        //Room Status Id
        HashMap<String, Object> roomStatusDetail = (HashMap<String, Object>) roomAllDetail.get("roomstates_id");
        RoomStates roomStates = new RoomStates();
        roomStates.setId((Integer) roomStatusDetail.get("id"));
        roomStates.setStatus((String) roomStatusDetail.get("status"));
        room.setRoomstates_id(roomStates);

        // Loop through the bedTypesList
        List<BedType> bedTypes = new ArrayList<>();
        List<HashMap<String, Object>> bedTypesList = (List<HashMap<String, Object>>) roomAllDetail.get("bedTypes");

        List<RoomHasBedType> roomHasBedTypes = new ArrayList<>();
        for (HashMap<String, Object> bedTypeMap : bedTypesList) {

            RoomHasBedType roomHasBedType = new RoomHasBedType();
            // Set BedType
            HashMap<String, Object> bedTypeDetail = (HashMap<String, Object>) bedTypeMap.get("bedType");
            BedType bedType = new BedType();
            bedType.setId((Integer) bedTypeDetail.get("id"));
            bedType.setType((String) bedTypeDetail.get("type"));
            roomHasBedType.setBedType(bedType);

            bedTypes.add(bedType);

            // Set Bed Count
            Object bedCountObj = bedTypeMap.get("bed_count");

            if (bedCountObj instanceof Integer) {
                roomHasBedType.setBed_count((Integer) bedCountObj);
            } else if (bedCountObj instanceof String) {
                roomHasBedType.setBed_count(Integer.parseInt((String) bedCountObj));
            } else {
                throw new IllegalArgumentException("Unexpected type for bed_count: " + bedCountObj.getClass().getName());
            }


            //System.out.println(Integer.parseInt((String) bedTypeMap.get("bed_count")));
            // add to list
            roomHasBedTypes.add(roomHasBedType);
        }
        room.setBedTypes(bedTypes);

        if (!roomHasBedTypeDao.findRoomCountByRoomId(roomId).isEmpty()){
            System.out.println("dfefsfdsfsdfdsfdsf " +roomId);
            roomDao.deleteRoomBedTypes(roomId);

        }

        Room savedRoom = roomDao.save(room);

        for (RoomHasBedType bedType : roomHasBedTypes) {

            System.out.println("Room id "+savedRoom.getId());
            System.out.println("Bed id "+bedType.getBedType().getId());
            System.out.println("Bed count "+bedType.getBed_count());
            roomDao.setRoomBedCount(bedType.getBed_count(),savedRoom.getId(),bedType.getBedType().getId());
        }
    }

    @DeleteMapping(value = "/{roomId}")
    public void deleteRoom(@PathVariable(value = "roomId") int roomId){
        System.out.println("Delete Mapping Run");

        Optional<Room> room = roomDao.findById(roomId);

        HashMap<String,String> errorSet = new HashMap<>();

        if (room.isPresent()){
            Optional<com.grindlaysresort.roomModule.roomstates.RoomStates> roomStates = roomStatesDao.findById(3);
            Room room1 = room.get();
            room1.setRoomstates_id(roomStates.get());
            roomDao.save(room1);
        }else {
            errorSet.put("room","Room is not found");
            throw new ObjectNotFoundException(errorSet);
        }
    }
}
