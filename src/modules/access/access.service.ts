import { Injectable } from '@nestjs/common';
import { Repository, getManager, TreeRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// import { CreateAccessDto } from './dto/create-access.dto';
// import { UpdateAccessDto } from './dto/update-access.dto';
import { AccessEntity } from './entities/access.entity';
import { ToolsService } from '../../utils/tools.service';

@Injectable()
export class AccessService {
  constructor(
    @InjectRepository(AccessEntity)
    private readonly accessRepository: Repository<AccessEntity>,
    @InjectRepository(AccessEntity)
    private readonly accessTreeRepository: TreeRepository<AccessEntity>,
  ) { }

  async create(body) {
    const { module_name, type, action_name, parentId, url } = body;

    const accessEntity = new AccessEntity();
    accessEntity.module_name = module_name;
    accessEntity.type = type;
    if (type === '1') {
      console.log(accessEntity);
      return await this.accessRepository.save(accessEntity);
    } else {
      const parentCategor = await this.accessRepository.findOne({
        id: parentId,
      });
      if (!parentCategor) ToolsService.fail('父级id不存在');

      accessEntity.action_name = action_name;
      if (url) accessEntity.url = url;
      accessEntity.parentCategory = parentCategor;
      return await this.accessRepository.save(accessEntity);
    }
  }

  async findAll() {
    const manager = getManager();
    //获取子级
    return await manager.getTreeRepository(AccessEntity).findTrees();
    // console.log(trees);
    // //获取根级
    // const trees2 = await manager.getTreeRepository(AccessEntity).findRoots();
    // console.log(trees2);
    // return {};
  }

  async findOne(id: number) {
    const p = await this.accessRepository.findOne(
      { id },
      { relations: ['parentCategory'] },
    );
    console.log(p);

    // const parentCategor = await this.accessRepository.findOne({ id });
    // if (!parentCategor) ToolsService.fail('父级id不存在');

    // //获取根级
    // const trees3 = await this.accessTreeRepository.findDescendants(
    //   parentCategor,
    // );
    // console.log(trees3);

    // const trees4 = await this.accessTreeRepository.findDescendantsTree(
    //   parentCategor,
    // );
    // console.log(trees4);
    return {};
  }

  update(id: number) {
    return `This action updates a #${id} access`;
  }

  remove(id: number) {
    return `This action removes a #${id} access`;
  }
}
